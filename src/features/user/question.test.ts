import { takeLatest } from "redux-saga/effects";
import questionSaga, { handleGetQuestion, hanleSubmit } from "./questionSaga";
import { questionAction } from "./questionSlice";

describe("Question Saga", () => {
  const genObject = questionSaga();

  it("Should wait for latest getQuestion action and call handleGetQuestion", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(questionAction.getQuestion.type, handleGetQuestion)
    );
  });
  it("Should wait for latest submit action and call hanleSubmit", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(questionAction.submit.type, hanleSubmit)
    );
  });

  it("should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
