// ApiClient.js

import axios from "axios";
import {store} from "../Store/index";

const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
  },
  timeout: 20000,
});

ApiClient.interceptors.request.use(
  (config) => {
    const { auth } = store.getState(); // Access the auth state from your store
    const data = store.getState();
    console.log(data);

    const accessToken = auth?.accessToken;
    console.log(accessToken);
    if (
      config.url &&
      !config.url.endsWith("/signup") &&
      !config.url.endsWith("/signin") &&
      !config.url.includes("/verify-email") &&
      accessToken
    ) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default ApiClient;
