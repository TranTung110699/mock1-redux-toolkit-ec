import {
  UserLogin,
  UserModel,
  UserRegister,
  UserLogout,
  UserRefreshToken,
  RefreshTokenOutput,
} from "../models/User";
import axiosClient from "./axiosClient";

export const authApi = {
  login(loginData: UserLogin): Promise<UserModel> {
    const url = "/v1/auth/login";
    console.log("ghi");
    return axiosClient.post(url, loginData);
  },
  signUp(signUpData: UserRegister): Promise<UserModel> {
    const url = "/v1/auth/register";
    return axiosClient.post(url, signUpData);
  },
  logout(logoutToken: UserLogout) {
    const url = "/v1/auth/logout";
    return axiosClient.post(url, logoutToken);
  },
  refreshToken(refreshToken: UserRefreshToken): Promise<RefreshTokenOutput> {
    const url = "/v1/auth/refresh-tokens";
    return axiosClient.post(url, refreshToken);
  },
};
