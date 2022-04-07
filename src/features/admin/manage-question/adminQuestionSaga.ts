import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { adminQuestionAction } from "./adminQuestionSlice";
import { adminApi } from "../../../api/adminApi";
import { AdminQuestionOutput, Page } from "../../../models/Question";
import {
  AdminQuestion,
  AdminQuestionOutputModel,
} from "../../../models/Question";

export function* handleGetAdminQuestion(action: PayloadAction<Page>) {
  try {
    const res: AdminQuestionOutputModel = yield call(
      adminApi.getQuestionAdmin,
      action.payload
    );
    console.log("questionadmin", res);
    yield put(adminQuestionAction.getAdminQuestionSuccess(res));
  } catch (error) {}
}

export function* handleGetAdminQuestionById(action: PayloadAction<string>) {
  try {
    const res: AdminQuestionOutput = yield call(
      adminApi.getQuestionAdminById,
      action.payload
    );
    console.log("questionadminbyid", res);
    yield put(adminQuestionAction.getAdminQuestionByIdSuccess(res));
  } catch (error) {}
}

export function* hanlePostAdminQuestion(action: PayloadAction<AdminQuestion>) {
  try {
    const res: AdminQuestionOutput = yield call(
      adminApi.createQuestion,
      action.payload
    );
    yield put(adminQuestionAction.postAdminQuestionSuccess(res));
    toast.success("Add Question Complete");
    console.log("Add Question", res);
  } catch (error) {}
}

interface patchQuestionType {
  question: AdminQuestion;
  questionId: string;
}

export function* hanleEditAdminQuestion(
  action: PayloadAction<patchQuestionType>
) {
  try {
    const res: AdminQuestionOutput = yield call(
      adminApi.editQuestion,
      action.payload
    );
    yield put(adminQuestionAction.patchAdminQuestionSuccess(res));
    toast.success("Edit Question Complete");
    console.log("Edit Question", res);
  } catch (error) {}
}

export function* hanleDeleteAdminQuestion(action: PayloadAction<string>) {
  try {
    yield call(adminApi.deleteQuestion, action.payload);
    toast.success("Delete success");
  } catch (error) {}
}

export default function* adminQuestionSaga() {
  yield takeLatest(
    adminQuestionAction.getAdminQuestion.type,
    handleGetAdminQuestion
  );
  yield takeLatest(
    adminQuestionAction.getAdminQuestionById.type,
    handleGetAdminQuestionById
  );
  yield takeLatest(
    adminQuestionAction.postAdminQuestion.type,
    hanlePostAdminQuestion
  );
  yield takeLatest(
    adminQuestionAction.patchAdminQuestion.type,
    hanleEditAdminQuestion
  );
  yield takeLatest(
    adminQuestionAction.deleteAdminQuestion.type,
    hanleDeleteAdminQuestion
  );
}
