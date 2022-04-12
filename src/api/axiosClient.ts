import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { log } from "console";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authAction } from "../features/auth/authSlice";
import { RefreshTokenOutput } from "../models/User";

function refreshToken(refreshToken: string) {
  return axiosClient
    .post("/v1/auth/refresh-tokens", {
      refreshToken: refreshToken,
    })
    .then((res) => res.data);
}

const axiosClient = axios.create({
  baseURL: "https://fwa-ec-quiz.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    console.log("config test: ", config);
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      // config.headers = config.headers || {};
      // config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      //   "access_token"
      // )}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    const originalConfig = error.config;
    if (originalConfig.url !== "/v1/auth/login" && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        console.log("test error: Done");
        originalConfig._retry = true;
        try {
          const rs: any = await axiosClient.post("/v1/auth/refresh-tokens", {
            refreshToken: localStorage.getItem("refresh_token"),
          });
          console.log("test data: ", rs);
          localStorage.setItem("access_expires", rs.access.expires);
          localStorage.setItem("access_token", rs.access.token);
          localStorage.setItem("refresh_expires", rs.refresh.expires);
          localStorage.setItem("refresh_token", rs.refresh.token);
          console.log("test header: ", axiosClient(originalConfig));
          return axiosClient(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  }
);

export default axiosClient;
