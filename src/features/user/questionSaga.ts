import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { questionAction } from "./questionSlice";
import {
  Question,
  QuestionModel,
  Page,
  Answer,
  Result,
} from "../../models/Question";
import { questionApi } from "../../api/questionApi";

export function* handleGetQuestion(action: PayloadAction<Page>) {
  try {
    const res: QuestionModel = yield call(
      questionApi.getQuestion,
      action.payload
    );
    console.log("question", res);
    yield put(questionAction.getQuestionSuccess(res));
  } catch (error) {}
}

export function* hanleSubmit(action: PayloadAction<Answer[]>) {
  try {
    const res: Result[] = yield call(questionApi.submit, action.payload);
    yield put(questionAction.submitSuccess(res));
    toast.success("Quiz Complete");
    console.log("crSaga", res);
  } catch (error) {}
}

export default function* questionSaga() {
  yield takeLatest(questionAction.getQuestion.type, handleGetQuestion);
  yield takeLatest(questionAction.submit.type, hanleSubmit);
}
