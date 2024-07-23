import ApiClient from "../Config/ApiClient";

const DocumentUserService = {
  create: (payload) => {
    
    return ApiClient.post(`/api/v1/document/${payload.documentId}/share`, payload);
  },

  delete: (payload) => {
    return ApiClient.delete(
      `/api/v1/document/${payload.documentId}/share/${payload.userId}`
    );
  },
};

export default DocumentUserService;
