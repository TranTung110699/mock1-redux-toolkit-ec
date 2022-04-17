import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AdminQuestionOutputModel,
  Page,
  AdminQuestion,
  AdminQuestionOutput,
} from "../../../models/Question";

interface questionType {
  questions: AdminQuestionOutputModel;
  getQuesById?: AdminQuestionOutput;
  postQuestion?: AdminQuestionOutput;
  patchQuestion?: AdminQuestionOutput;
}

interface patchQuestionType {
  question: AdminQuestion;
  questionId: string;
}

const initialState: questionType = {
  questions: {
    results: [],
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  },
  getQuesById: {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctanswer: "",
    id: "",
  },
  postQuestion: undefined,
  patchQuestion: undefined,
};

const adminQuestionSlice = createSlice({
  name: "adminQuestion",
  initialState,
  reducers: {
    getAdminQuestion: (state, action: PayloadAction<Page>) => {},
    getAdminQuestionSuccess: (
      state,
      action: PayloadAction<AdminQuestionOutputModel>
    ) => {
      state.questions = action.payload;
    },

    getAdminQuestionById: (state, action: PayloadAction<any>) => {},
    getAdminQuestionByIdSuccess: (
      state,
      action: PayloadAction<AdminQuestionOutput>
    ) => {
      state.getQuesById = action.payload;
    },

    postAdminQuestion: (state, action: PayloadAction<any>) => {},
    postAdminQuestionSuccess: (
      state,
      action: PayloadAction<AdminQuestionOutput>
    ) => {
      state.postQuestion = action.payload;
    },

    patchAdminQuestion: (state, action: PayloadAction<any>) => {},
    patchAdminQuestionSuccess: (
      state,
      action: PayloadAction<AdminQuestionOutput>
    ) => {
      state.patchQuestion = action.payload;
    },

    deleteAdminQuestion: (state, action: PayloadAction<any>) => {},
  },
});

export const adminQuestionAction = adminQuestionSlice.actions;
const adminQuestionReducer = adminQuestionSlice.reducer;
export default adminQuestionReducer;
