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
    return res;
  } catch (error) {}
}

export function* hanlePostAdminQuestion(action: PayloadAction<any>) {
  try {
    // question, dispatch
    const res: AdminQuestionOutput = yield call(
      adminApi.createQuestion,
      action.payload.question
    );
    yield put(adminQuestionAction.postAdminQuestionSuccess(res));
    action.payload.dispatch(
      adminQuestionAction.getAdminQuestion({ page: action.payload.page })
    );
    action.payload.navigate("/admin/question-manage");
    toast.success("Add Question Complete");
    console.log("Add Question", res);
  } catch (error) {}
}

interface patchQuestionType {
  question: AdminQuestion;
  questionId: string;
}

export function* hanleEditAdminQuestion(action: PayloadAction<any>) {
  try {
    // formInput,dispatch,page,navigate,
    const res: AdminQuestionOutput = yield call(
      adminApi.editQuestion,
      action.payload.formInput
    );
    yield put(adminQuestionAction.patchAdminQuestionSuccess(res));
    action.payload.dispatch(
      adminQuestionAction.getAdminQuestion({ page: action.payload.page })
    );
    action.payload.navigate("/admin/question-manage");
    toast.success("Edit Question Complete");
    console.log("Edit Question", res);
  } catch (error) {}
}

export function* hanleDeleteAdminQuestion(action: PayloadAction<any>) {
  try {
    // idQuestion, dispatch, myPage
    yield call(adminApi.deleteQuestion, action.payload.idQuestion);
    action.payload.dispatch(
      adminQuestionAction.getAdminQuestion({ page: action.payload.myPage })
    );
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
