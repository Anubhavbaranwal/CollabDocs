import ApiClient from "../Config/ApiClient";

const DocumentService = {
  create: ( documentData) => {
    return ApiClient.post("/document", documentData)
  },
  get: ( documentId) => {
    return ApiClient.get(`/document/${documentId}`)
  },
  list: () => {
    return ApiClient.get("/document");
  },
  update: ( documentId, payload) => {
    return ApiClient.put(`/document/${documentId}`, payload);
  },
  delete: ( documentId) => {
    return ApiClient.delete(`/document/${documentId}`);
  },
};

export default DocumentService;