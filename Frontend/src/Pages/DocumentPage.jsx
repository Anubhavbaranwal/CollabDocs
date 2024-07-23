import { useParams } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import useDocument from "../hooks/useDocument";
import DocumentHeader from "../Component/Header/Header";
import { useContext, useEffect, useRef } from "react";
import { DocumentContext } from "../Context/Document";
import DocumentEditor from "../Component/Editor/Editor";

const Document = () => {
  const { heightStr, widthStr } = useWindowSize();
  const { id: documentId } = useParams();
  const documentHeaderRef = useRef(null); 
  const { loading, document } = useDocument(documentId );
  const { setDocument } = useContext(DocumentContext);
  console.log(document);

  const documentViewerHeight = `calc(${heightStr} - ${documentHeaderRef.current?.clientHeight}px)`;

  useEffect(() => {
    if (document !== null) setDocument(document);
  }, [document]);

  return (
    <div
      style={{ height: heightStr }}
      className="w-full h-full bg-gray flex flex-col"
    >
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <DocumentHeader documentHeaderRef={documentHeaderRef} />
          <div
            style={{
              height: documentViewerHeight,
            }}
            className="w-full flex flex-col justify-start items-center overflow-hidden"
          >
            <div
              style={{ width: widthStr }}
              className="h-full w-full overflow-auto space-y-4 flex flex-col items-center p-4"
            >
              <DocumentEditor />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Document;