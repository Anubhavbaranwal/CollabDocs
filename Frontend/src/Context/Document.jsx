import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import useAuth from "../hooks/useAuth";
  import DocumentService from "../Service/DocService";
import Toast from "../Component/Toast/Toast";
 
  
  const defaultValues = {
    document: null,
    setDocument: () => {},
    errors: [],
    setErrors: () => {},
    loading: false,
    setLoading: () => {},
    saving: false,
    setSaving: () => {},
    currentUsers: new Set(),
    setCurrentUsers: () => {},
    setDocumentTitle: () => {},
    saveDocument: async () => {},
  };
  
  export const DocumentContext =
    createContext(defaultValues);
  
  
  export const DocumentProvider = ({ children }) => {
    const { accessToken } = useAuth();
  
    const [document, setDocument] = useState(
      defaultValues.document
    );
    const [errors, setErrors] = useState(defaultValues.errors);
    const [loading, setLoading] = useState(defaultValues.loading);
    const [saving, setSaving] = useState(defaultValues.saving);
    const [currentUsers, setCurrentUsers] = useState(defaultValues.currentUsers);
  
    const setDocumentTitle = (title) => {
      setDocument({ ...document, title } );
    };
    console.log(document);
  
    const saveDocument = async (updatedDocument) => {
      if (accessToken === null) return;
       
      setSaving(true);
  
      try {
        await DocumentService.update(document.id, updatedDocument);
        setDocument(updatedDocument);
      } catch (error) {
        setErrors(["There was an error saving the document. Please try again."]);
      } finally {
        setSaving(false);
      }
    };
  
    useEffect(() => {
      if (errors.length) {
        errors.forEach((err) => {
          Toast({error:true,message:err});
        });
      }
    }, [errors]);
  
    return (
      <DocumentContext.Provider
        value={{
          document,
          errors,
          loading,
          saving,
          currentUsers,
          setDocument,
          setErrors,
          setLoading,
          setSaving,
          setCurrentUsers,
          setDocumentTitle,
          saveDocument,
        }}
      >
        {children}
      </DocumentContext.Provider>
    );
  };