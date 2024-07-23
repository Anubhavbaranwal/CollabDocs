import ApiClient from "../Config/ApiClient";

const AuthService = {
  login: ({ email, password }) => {
    return ApiClient.post("/api/v1/user/login", { email, password });
  },
  Register: ({ email, password }) => {
    return ApiClient.post("/api/v1/user/register", { email, password });
  },
  verifyEmail: (token) => {
    return ApiClient.get(`/api/v1/user/verify-email/${token}`);
  },
};
export default AuthService;
