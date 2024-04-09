import LocalStorage from "@/lib/localstroage";
import axios from "axios";
import { refresh } from "./auth/auth-api";
import { errorToast } from "@/utils/toasts";

export const instance = axios.create({
  baseURL: "https://api-builder.lighterlinks.io",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = LocalStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = LocalStorage.getItem("refreshToken");
    if (error.response?.status == 403) {
      if (!refreshToken) {
        LocalStorage.removeItem("refreshToken");
        LocalStorage.removeItem("accessToken");
        errorToast("Session expired. Please sign in again.");
        window.location.href = "/signin";
        return Promise.reject(error);
      }
      const { status, message, accessToken } = await refresh({ refreshToken });
      if (status === 200) {
        LocalStorage.setItem("accessToken", accessToken!);
        return instance(originalRequest);
      } else {
        LocalStorage.removeItem("refreshToken");
        LocalStorage.removeItem("accessToken");
        errorToast("Session expired. Please sign in again.");
        window.location.href = "/signin";
        return Promise.reject(error);
      }
    } else if (error.response?.status == 401) {
      LocalStorage.removeItem("refreshToken");
      LocalStorage.removeItem("accessToken");
      window.location.href = "/signin";
      return Promise.reject(error);
    } else return Promise.reject(error);
  }
);
