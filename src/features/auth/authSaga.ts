import { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";
import { AxiosError } from "axios";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { call, put, take, takeLatest } from "redux-saga/effects";
import {
  UserModel,
  UserLogin,
  UserRegister,
  UserLogout,
  RefreshTokenOutput,
} from "../../models/User";
import { authAction } from "./authSlice";
import { UserRefreshToken } from "../../models/User";
import { fork } from "child_process";
import { useNavigate, Navigate } from "react-router-dom";

export function* hanleLogin(action: PayloadAction<any>) {
  try {
    console.log("action.payload", action.payload);

    const res: UserModel = yield call(authApi.login, action.payload.formLogin);
    yield put(authAction.loginSuccess(res));
    toast.success("Login Success");
    localStorage.setItem("access_token", res.tokens.access.token);
    localStorage.setItem("access_expires", res.tokens.access.expires);
    localStorage.setItem("refresh_token", res.tokens.refresh.token);
    localStorage.setItem("refresh_expires", res.tokens.refresh.expires);
    localStorage.setItem("current_user", res.user.username);
    localStorage.setItem("role", res.user.role);
    console.log(res);
    if (res.user.role === "user") {
      action.payload.navigate("/user");
    }
    if (res.user.role === "admin") {
      action.payload.navigate("/admin");
    }
  } catch (error) {
    yield put(authAction.loginFaile());
    toast.error("Username or password incorrect");
  }
}
export function* handleSignUp(action: PayloadAction<any>) {
  try {
    const res: UserModel = yield call(
      authApi.signUp,
      action.payload.formRegister
    );
    yield put(authAction.signUpSuccess(res));
    toast.success("Register success");
    localStorage.setItem("access_token", res.tokens.access.token);
    localStorage.setItem("access_expires", res.tokens.access.expires);
    localStorage.setItem("refresh_token", res.tokens.refresh.token);
    localStorage.setItem("refresh_expires", res.tokens.refresh.expires);
    localStorage.setItem("current_user", res.user.username);
    localStorage.setItem("role", res.user.role);
    console.log(res);
    if (res.user.role === "user") {
      action.payload.navigate("/user");
    }
    if (res.user.role === "admin") {
      action.payload.navigate("/admin");
    }
  } catch (error) {
    yield put(authAction.loginFaile());
    const err = error as AxiosError;
    if (err.response) {
      toast.error(err.response.data.message);
    }
  }
}
export function* handleRefresh(action: PayloadAction<UserRefreshToken>) {
  try {
    const res: RefreshTokenOutput = yield call(
      authApi.refreshToken,
      action.payload
    );
    yield put(authAction.refreshSuccess(res));
    toast.success("RefreshToken Success");

    localStorage.setItem("access_token", res.access.token);
    localStorage.setItem("access_expires", res.access.expires);
    localStorage.setItem("refresh_token", res.refresh.token);
    localStorage.setItem("refresh_expires", res.refresh.expires);
    console.log("refresh test Saga", res);
  } catch (error) {}
}
export function* handleLogout(action: PayloadAction<any>) {
  try {
    yield call(authApi.logout, action.payload.logoutToken);
    yield put(authAction.signOutSuccess());
    toast.success("Logout success");
    localStorage.removeItem("access_token");
    localStorage.removeItem("access_expires");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("refresh_expires");
    localStorage.removeItem("current_user");
    localStorage.removeItem("role");
    action.payload.navigate("/login");
  } catch (error) {}
}

// function* watchLoginFlow() {
//   while (true) {
//     const isLoggedIn = Boolean(localStorage.getItem("access_token"));

//     if (!isLoggedIn) {
//       const action: PayloadAction<UserLogin> = yield take(
//         authAction.login.type
//       );
//       yield fork(hanleLogin, action.payload);
//     }

//     yield take(authAction.signOut.type);
//     yield call(handleLogout);
//   }
// }

export default function* authSaga() {
  // yield fork(watchLoginFlow);
  yield takeLatest(authAction.login.type, hanleLogin);
  yield takeLatest(authAction.signUp.type, handleSignUp);
  yield takeLatest(authAction.refresh.type, handleRefresh);
  yield takeLatest(authAction.signOut.type, handleLogout);
  // yield takeLatest(authAction.getCurrentUser.type, handleGetUserProfile);
}
