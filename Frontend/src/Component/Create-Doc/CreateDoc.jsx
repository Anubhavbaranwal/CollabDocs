import CreateDocumentButton from "../Button/CreateBtn";
// import Spinner from "../../components/atoms/spinner/spinner";
import DocumentsList from "../DocumentList/Doclist.jsx";
import DocumentCreateHeader from "../Header/CreateDocHeader.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import useDocuments from "../../hooks/UseDocuments.jsx";
import useWindowSize from "../../hooks/useWindowSize.jsx";

const Create = () => {
  const { heightStr } = useWindowSize();
  const { userId } = useAuth();
  const { documents, loading, setDocuments } = useDocuments();

  const recentDocuments =
    documents === null
      ? []
      : documents.filter((document) => document.userId === userId);

  const sharedDocuments =
    documents === null
      ? []
      : documents.filter((document) => document.userId !== userId);

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader />
      <CreateDocumentButton />
      {loading ? (
        // <Spinner size="lg" />
        "loading"
      ) : (
        <>
          <DocumentsList
            title="Recent Documents"
            documents={recentDocuments}
            setDocuments={setDocuments}
          />
          <DocumentsList
            title="Shared Documents"
            documents={sharedDocuments}
            setDocuments={setDocuments}
          />
        </>
      )}
    </div>
  );
};

export default Create;