import {
    EditorState,
    Editor,
    convertToRaw,
    convertFromRaw,
    RawDraftContentState,
  } from "draft-js";
  import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react";
  import { FONTS } from "../Utils/font";
  import { DocumentContext } from "./Document";
  import useAuth from "../hooks/useAuth";
  import { io } from "socket.io-client";
import Toast from "../Component/Toast/Toast";
  
  
  const BASE_URL=import.meta.env.VITE_BASE_URL;
  const defaultValues = {
    editorState: EditorState.createEmpty(),
    setEditorState: () => {},
    socket: null,
    documentRendered: false,
    setDocumentRendered: () => {},
    editorRef: null,
    handleEditorChange: () => {},
    focusEditor: () => {},
    currentFont: FONTS[0],
    setCurrentFont: () => {},
  };
  
  export const EditorContext =
    createContext(defaultValues);
  
  
  
  const DEFAULT_SAVE_TIME = 1500;
  let saveInterval = null;
  
  export const EditorProvider = ({ children }) => {
    const [editorState, setEditorState] = useState(defaultValues.editorState);
    const socket = useRef(defaultValues.socket);
    const [documentRendered, setDocumentRendered] = useState(
      defaultValues.documentRendered
    );
    const editorRef = useRef(defaultValues.editorRef);
    const [currentFont, setCurrentFont] = useState(defaultValues.currentFont);
  
    const { document, setCurrentUsers, setSaving, setDocument, saveDocument } =
      useContext(DocumentContext);

    // const { error } = useContext(ToastContext);
    const { accessToken } = useAuth();
  
    const focusEditor = () => {
      if (editorRef === null || editorRef.current === null) return;
  
      editorRef.current.focus();
    };
  
    //Send Changes
    const handleEditorChange = (editorState) => {
        const newState = EditorState.moveSelectionToEnd(editorState);
        setEditorState(newState);
  
      if (socket === null) return;
  
      const content = convertToRaw(editorState.getCurrentContent());
  
      socket.current.emit("send-changes", content);
  
      const updatedDocument = {
        ...document,
        content: JSON.stringify(content),
      } 
  
      setDocument(updatedDocument);
  
      if (document === null || JSON.stringify(content) === document.content)
        return;
  
      setSaving(true);
  
      if (saveInterval !== null) {
        clearInterval(saveInterval);
      }
  
      saveInterval = setInterval(async () => {
       const data= await saveDocument(updatedDocument);
       console.log("documentsaving",data)
        if (saveInterval) clearInterval(saveInterval);
      }, DEFAULT_SAVE_TIME);
    };
  
    //Load document content
    useEffect(() => {
      
      if (documentRendered || document === null || document.content === null) return;
  
      try {
        const contentState = convertFromRaw(
          JSON.parse(document.content) 
        );
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(EditorState.moveSelectionToEnd(newEditorState));
      } catch {
        // error("Error when loading document.");
        Toast({error:true,message:"Error when loading document."});
      } finally {
        setDocumentRendered(true);
      }
    }, [document]);
  
    //Connect Socket
    useEffect(() => {
      if (
        document === null ||
        accessToken === null ||
        socket === null ||
        (socket.current !== null && socket.current.connected)
      )
        return;
        console.log(document)
      socket.current = io(BASE_URL, {
        query: { documentId: document?.data?.id, accessToken },
      }).connect();
    }, [document, socket, accessToken]);
  
    //Disconnect Socket
    useEffect(() => {
      return () => {
        socket?.current?.disconnect();
      };
    }, []);
  
    //Receive Changes
    useEffect(() => {
      if (socket.current === null) return;
  
      const handler = (rawDraftContentState) => {
        const contentState = convertFromRaw(rawDraftContentState);
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(EditorState.moveSelectionToEnd(newEditorState));
      };
  
      socket.current.on("receive-changes", handler);
  
      return () => {
        socket.current.off("receive-changes", handler);
      };
    }, [socket.current]);
  
    //current users updated
    useEffect(() => {
      if (socket.current === null) return;
  
      const handler = (currentUsers) => {
        setCurrentUsers(new Set(currentUsers));
      };
  
      socket.current.on("current-users-update", handler);
  
      return () => {
        socket.current.off("current-users-update", handler);
      };
    }, [socket.current]);
  
    return (
      <EditorContext.Provider
        value={{
          editorState,
          socket,
          documentRendered,
          setDocumentRendered,
          editorRef,
          currentFont,
          setEditorState,
          setCurrentFont,
          focusEditor,
          handleEditorChange,
        }}
      >
        {children}
      </EditorContext.Provider>
    );
  };