import { Answer, Page, QuestionModel, Result } from "../models/Question";
import axiosClient from "./axiosClient";

export const questionApi = {
  getQuestion(page: Page): Promise<QuestionModel> {
    const url = "/v1/questions/?page=" + page.page;
    return axiosClient.get(url);
  },
  submit(submitData: Answer[]): Promise<Result[]> {
    const url = "/v1/questions/submit";
    return axiosClient.post(url, submitData);
  },
};
