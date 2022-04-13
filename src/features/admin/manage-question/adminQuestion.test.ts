import { takeLatest } from "redux-saga/effects";
import adminQuestionSaga, {
  handleGetAdminQuestion,
  handleGetAdminQuestionById,
  hanlePostAdminQuestion,
  hanleEditAdminQuestion,
  hanleDeleteAdminQuestion,
} from "./adminQuestionSaga";
import { adminQuestionAction } from "./adminQuestionSlice";

describe("Admin Question Saga", () => {
  const genObject = adminQuestionSaga();

  it("Should wait for latest getAdminQuestion action and call handleGetAdminQuestion", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(
        adminQuestionAction.getAdminQuestion.type,
        handleGetAdminQuestion
      )
    );
  });
  it("Should wait for latest getAdminQuestionById action and call handleGetAdminQuestionById", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(
        adminQuestionAction.getAdminQuestionById.type,
        handleGetAdminQuestionById
      )
    );
  });

  it("Should wait for latest postAdminQuestion action and call hanlePostAdminQuestion", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(
        adminQuestionAction.postAdminQuestion.type,
        hanlePostAdminQuestion
      )
    );
  });
  it("Should wait for latest patchAdminQuestion action and call hanleEditAdminQuestion", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(
        adminQuestionAction.patchAdminQuestion.type,
        hanleEditAdminQuestion
      )
    );
  });

  it("Should wait for latest deleteAdminQuestion action and call hanleDeleteAdminQuestion", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(
        adminQuestionAction.deleteAdminQuestion.type,
        hanleDeleteAdminQuestion
      )
    );
  });

  it("should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
