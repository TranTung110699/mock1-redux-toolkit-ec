// get q
export interface Question {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  id: string;
}

export interface Page {
  page: number;
}
export interface QuestionModel {
  results: Question[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

//post create, edit and delete q
export interface AdminQuestion {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctanswer: string;
}

export interface AdminQuestionOutput {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctanswer: string;
  id: string;
}

//post answer
export interface Answer {
  id: string;
  correctanswer: string;
}

export interface Result {
  result: boolean;
  id: string;
  correctanswer: string;
}
