import { useContext, useEffect, useState } from "react";
import useAuth from "./use-auth";
import { ToastContext } from "../contexts/toast-context";
import DocumentService from "../services/document-service";
import axios, { AxiosError } from "axios";
import Toast from "../Component/Toast/Toast";

const useDocument = (documentId) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [document, setDocument] = useState(null);

  const loadDocument = async (accessToken, documentId) => {
    setLoading(true);

    try {
      const response = await DocumentService.get(accessToken, documentId);
      setDocument(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response?.status === 404) {
          setErrors((prev) => [...prev, "Document does not exist"]);
        } else {
          setErrors((prev) => [
            ...prev,
            "An unknown error has occurred. Please try again.",
          ]);
        }
      } else {
        setErrors((prev) => [
          ...prev,
          "An unknown error has occurred. Please try again.",
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken === null) return;

    loadDocument(accessToken, documentId);
  }, [accessToken, documentId]);

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => {
        Toast({error:true,message:err});
      });
    }
  }, [errors]);

  return {
    document,
    errors,
    loading,
  };
};

export default useDocument;