import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useDocuments from "../hooks/UseDocuments";
import useWindowSize from "../hooks/useWindowSize";
import CreateDocumentButton from "../Component/Button/CreateBtn";
import Spinner from "../Component/Spinner/Spinner";
import DocumentsList from "../Component/DcoumentList/Documentlist";
import DocumentCreateHeader from "../Component/Header/HeaderCreate";
import { useSelector } from "react-redux";

const Create = () => {
  const { heightStr } = useWindowSize();
  const userId =useSelector((state)=>state?.auth?.userId);
  const { documents, loading, setDocuments } = useDocuments();
  console.log(documents,userId);

  const recentDocuments =
    documents === null
      ? []
      : documents?.data?.filter((document) => document.userId === userId);
  console.log(recentDocuments);
  const sharedDocuments =
    documents === null
      ? []
      : documents?.data?.filter((document) => document.userId !== userId);

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader />
      <CreateDocumentButton />
      {loading ? (
        <Spinner size="lg" />
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
