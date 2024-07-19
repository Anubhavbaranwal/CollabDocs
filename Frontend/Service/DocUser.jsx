import ApiClient from "../Config/ApiClient";

const DocumentUserService = {
  create: (payload) => {
    return ApiClient.post(`document/${payload.documentId}/share`, payload);
  },

  delete: (payload) => {
    return ApiClient.delete(
      `document/${payload.documentId}/share/${payload.userId}`
    );
  },
};

export default DocumentUserService;
