import { useContext, useEffect, useState } from "react";
import useAuth from "./use-auth";
import DocumentInterface from "../types/interfaces/document";
import DocumentService from "../services/document-service";
import Toast from "../Component/Toast/Toast";

const useDocuments = () => {
  const { accessToken } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDocuments = async (accessToken) => {
    setLoading(true);

    try {
      const response = await DocumentService.list();
      setDocuments(response.data);
    } catch (err) {
      Toast({
        error: true,
        message: "Unable to load documents. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken === null) return;
    loadDocuments(accessToken);
  }, [accessToken]);

  return {
    documents,
    loading,
    setDocuments,
    setLoading,
  };
};

export default useDocuments;
