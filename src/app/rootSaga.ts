import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import questionSaga from "../features/user/questionSaga";

export default function* rootSaga() {
  yield all([authSaga(), questionSaga()]);
}
