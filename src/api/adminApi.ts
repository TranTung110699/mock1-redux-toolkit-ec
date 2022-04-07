import {
  Page,
  AdminQuestionOutputModel,
  AdminQuestion,
  AdminQuestionOutput,
} from "../models/Question";
import {
  ManageUser,
  UserAdminModel,
  UserCreate,
  UserUpdate,
} from "../models/User";
import axiosClient from "./axiosClient";

interface patchQuestionType {
  question: AdminQuestion;
  questionId: string;
}

interface patchUserType {
  user: UserUpdate;
  userId: string;
}

export const adminApi = {
  //Manage Question
  getQuestionAdmin(page: Page): Promise<AdminQuestionOutputModel> {
    const url = `/v1/questions/edit?page=${page.page}`;
    return axiosClient.get(url);
  },
  getQuestionAdminById(questionId: string): Promise<AdminQuestionOutput> {
    const url = `/v1/questions/edit/${questionId}`;
    return axiosClient.get(url);
  },
  createQuestion(createData: AdminQuestion): Promise<AdminQuestionOutput> {
    const url = "v1/questions/edit";
    return axiosClient.post(url, createData);
  },
  editQuestion(editData: patchQuestionType): Promise<AdminQuestionOutput> {
    const url = `v1/questions/edit/${editData.questionId}`;
    return axiosClient.patch(url, editData.question);
  },
  deleteQuestion(questionId: string) {
    const url = `v1/questions/edit/${questionId}`;
    return axiosClient.delete(url);
  },

  //Manage User
  getUserAdmin(page: Page): Promise<UserAdminModel> {
    const url = `/v1/users?page=${page.page}`;
    return axiosClient.get(url);
  },
  getUserAdminById(userId: string): Promise<ManageUser> {
    const url = `/v1/users/${userId}`;
    return axiosClient.get(url);
  },
  createUser(createData: UserCreate): Promise<ManageUser> {
    const url = "/v1/users";
    return axiosClient.post(url, createData);
  },
  editUser(editData: patchUserType): Promise<ManageUser> {
    const url = `/v1/users/${editData.userId}`;
    return axiosClient.patch(url, editData.user);
  },
};
