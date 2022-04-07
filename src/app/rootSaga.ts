import { all } from "redux-saga/effects";
import adminQuestionSaga from "../features/admin/manage-question/adminQuestionSaga";
import adminUserSaga from "../features/admin/manage-user/adminUserSaga";
import authSaga from "../features/auth/authSaga";
import questionSaga from "../features/user/questionSaga";

export default function* rootSaga() {
  yield all([authSaga(), questionSaga(), adminQuestionSaga(), adminUserSaga()]);
}
