import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient = axios.create({
  baseURL: "https://fwa-ec-quiz.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // check token
    let accesstoken: string | null = localStorage.getItem("access_token");
    // Do something before request is sent
    // const token = checkToken();
    config.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accesstoken}`,
    };
    return config;
  },
  function (error: any) {
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
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
