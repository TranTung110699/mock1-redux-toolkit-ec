import { takeLatest } from "redux-saga/effects";
import adminUserSaga, {
  handleGetAdminUser,
  handleGetAdminUserById,
  hanlePostAdminUser,
  hanleEditAdminManageUser,
} from "./adminUserSaga";
import { adminUserAction } from "./adminUserSlice";

describe("Admin User Saga", () => {
  const genObject = adminUserSaga();

  it("Should wait for latest getAdminUser action and call handleGetAdminUser", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(adminUserAction.getAdminUser.type, handleGetAdminUser)
    );
  });
  it("Should wait for latest getAdminUserById action and call handleGetAdminUserById", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(adminUserAction.getAdminUserById.type, handleGetAdminUserById)
    );
  });

  it("Should wait for latest postAdminUser action and call hanlePostAdminUser", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(adminUserAction.postAdminUser.type, hanlePostAdminUser)
    );
  });
  it("Should wait for latest patchAdminUser action and call hanleEditAdminManageUser", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(adminUserAction.patchAdminUser.type, hanleEditAdminManageUser)
    );
  });

  it("should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
