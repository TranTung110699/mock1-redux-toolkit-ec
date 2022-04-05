import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Answer,
  Page,
  Question,
  QuestionModel,
  Result,
} from "../../models/Question";

interface questionType {
  questions: QuestionModel;
  result: Result[];
}

const initialState: questionType = {
  questions: {
    results: [],
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  },
  result: [],
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    getQuestion: (state, action: PayloadAction<Page>) => {},
    getQuestionSuccess: (state, action: PayloadAction<QuestionModel>) => {
      state.questions = action.payload;
    },
    submit: (state, action: PayloadAction<Answer[]>) => {},
    submitSuccess: (state, action: PayloadAction<Result[]>) => {
      state.result = action.payload;
    },
  },
});

export const questionAction = questionSlice.actions;
const questionReducer = questionSlice.reducer;
export default questionReducer;
