import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleSignUp } from "./authSaga";
import { UserLogout, UserRefreshToken } from "../../models/User";
import {
  UserLogin,
  UserRegister,
  UserModel,
  RefreshTokenOutput,
} from "../../models/User";

interface authType {
  isLogged: boolean;
  isLogging?: boolean;
  userState?: UserModel;
  reToken?: RefreshTokenOutput;
}

const initialState: authType = {
  isLogged: false,
  isLogging: false,
  userState: undefined,
  reToken: {
    access: {
      token: "",
      expires: "",
    },
    refresh: {
      token: "",
      expires: "",
    },
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<UserLogin>) {
      state.isLogging = true;
      console.log("abc");
    },
    getCurrentUser(state) {
      state.isLogging = true;
    },
    loginSuccess(state, action: PayloadAction<UserModel>) {
      state.userState = action.payload;
      state.isLogged = true;
      state.isLogging = false;
    },
    loginFaile(state) {
      state.isLogged = false;
      state.isLogging = false;
    },
    signUp(state, action: PayloadAction<UserRegister>) {
      state.isLogging = true;
    },
    signUpSuccess(state, action: PayloadAction<UserModel>) {
      state.userState = action.payload;
      state.isLogged = true;
      state.isLogging = false;
    },
    signOut(state, action: PayloadAction<UserLogout>) {
      state.isLogging = true;
    },
    signOutSuccess(state) {
      state.isLogged = false;
      state.userState = undefined;
    },
    refresh(state, action: PayloadAction<UserRefreshToken>) {
      state.isLogged = true;
    },
    refreshSuccess(state, action: PayloadAction<RefreshTokenOutput>) {
      state.isLogged = true;
      state.reToken = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export const selectIsLogin = (state: any) => state.auth.isLogged;
export const selectIsLogging = (state: any) => state.auth.isLogging;
const authReducer = authSlice.reducer;
export default authReducer;
