import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { adminUserAction } from "./adminUserSlice";
import { adminApi } from "../../../api/adminApi";
import { AdminQuestionOutput, Page } from "../../../models/Question";
import {
  UserAdminModel,
  ManageUser,
  UserCreate,
  UserUpdate,
} from "../../../models/User";
import {
  AdminQuestion,
  AdminQuestionOutputModel,
} from "../../../models/Question";

export function* handleGetAdminUser(action: PayloadAction<Page>) {
  try {
    const res: UserAdminModel = yield call(
      adminApi.getUserAdmin,
      action.payload
    );
    console.log("Useradmin", res);
    yield put(adminUserAction.getAdminUserSuccess(res));
  } catch (error) {}
}

export function* handleGetAdminUserById(action: PayloadAction<string>) {
  try {
    const res: ManageUser = yield call(
      adminApi.getUserAdminById,
      action.payload
    );
    console.log("UseradminById", res);
    yield put(adminUserAction.getAdminUserByIdSuccess(res));
  } catch (error) {}
}

export function* hanlePostAdminUser(action: PayloadAction<UserCreate>) {
  try {
    const res: ManageUser = yield call(adminApi.createUser, action.payload);
    yield put(adminUserAction.postAdminUserSuccess(res));
    toast.success("Add User Complete");
    console.log("Add User", res);
  } catch (error) {}
}

interface patchUserType {
  user: UserUpdate;
  userId: string;
}

export function* hanleEditAdminManageUser(
  action: PayloadAction<patchUserType>
) {
  try {
    const res: ManageUser = yield call(adminApi.editUser, action.payload);
    yield put(adminUserAction.patchAdminUserSuccess(res));
    toast.success("Edit User Complete");
    console.log("Edit User", res);
  } catch (error) {}
}

export default function* adminUserSaga() {
  yield takeLatest(adminUserAction.getAdminUser.type, handleGetAdminUser);
  yield takeLatest(
    adminUserAction.getAdminUserById.type,
    handleGetAdminUserById
  );
  yield takeLatest(adminUserAction.postAdminUser.type, hanlePostAdminUser);
  yield takeLatest(
    adminUserAction.patchAdminUser.type,
    hanleEditAdminManageUser
  );
}
