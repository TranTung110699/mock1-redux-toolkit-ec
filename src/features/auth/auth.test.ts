import { takeLatest } from "redux-saga/effects";
import authSaga, {
  handleLogout,
  handleRefresh,
  handleSignUp,
  hanleLogin,
} from "./authSaga";
import { authAction } from "./authSlice";

describe("Auth Saga", () => {
  const genObject = authSaga();

  it("Should wait for latest Login action and call hanleLogin", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(authAction.login.type, hanleLogin)
    );
  });
  it("Should wait for latest signUp action and call hanleSignUp", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(authAction.signUp.type, handleSignUp)
    );
  });

  it("Should wait for latest refresh action and call handleRefresh", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(authAction.refresh.type, handleRefresh)
    );
  });

  it("Should wait for latest signOut action and call handleLogout", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(authAction.signOut.type, handleLogout)
    );
  });
  it("should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
