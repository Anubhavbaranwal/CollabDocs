import ApiClient from "../Config/ApiClient";

const DocumentService = {
  create: ( documentData) => {
    return ApiClient.post("/api/v1/document", documentData)
  },
  get: ( documentId) => {
    return ApiClient.get(`/api/v1/document/${documentId}`)
  },
  list: () => {
    return ApiClient.get("/api/v1/document");
  },
  update: ( documentId, payload) => {
    return ApiClient.put(`/api/v1/document/${documentId}`, payload);
  },
  delete: ( documentId) => {
    return ApiClient.delete(`/api/v1/document/${documentId}`);
  },
};

export default DocumentService;