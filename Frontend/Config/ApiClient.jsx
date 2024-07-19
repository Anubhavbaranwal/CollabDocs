import axios from "axios";
// import store from "../../src/Store/Store";

const ApiClient = axios.create({
  baseURL:import.meta.env.VITE_API_URL ,
  // withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
    // withCredentials: false,
  },
  timeout:20000,
});

ApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (config.url && !config.url.endsWith("/signup") && !config.url.endsWith("/signin") && token) {
      config.headers = config.headers || {};

      config.headers["Authorization"] = `${token}`;
  }
  return config;
  },
  (error) => {
    // Handle the error
    console.error(error);
    return Promise.reject(error);
  }
);

export default ApiClient;