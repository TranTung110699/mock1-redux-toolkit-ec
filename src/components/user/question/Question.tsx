import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { store, RootState } from "../../../app/store";
import { questionAction } from "../../../features/user/questionSlice";
import "./question.css";
import { Question, Answer, Result } from "../../../models/Question";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Card, Radio, Row, Space, Button, Modal, Col } from "antd";
import Swal from "sweetalert2";
import { authAction } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { UserLogout } from "../../../models/User";

interface formState {
  refreshToken: string;
}

const QuestionComponent = () => {
  const [questions, setQuestion] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const answers = useRef<Answer[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);
  const [myPage, setMyPage] = useState(1);
  const navigate = useNavigate();

  const onRadioChange = (e: any) => {
    answers.current[questionIndex].correctanswer = e.target.value;
    console.log("asw", answers.current);
  };

  const questionList = useAppSelector(
    (state) => state.question.questions.results
  );

  const correctResult = useAppSelector((state) => state.question.result);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(questionAction.getQuestion({ page: 1 }));
    if (questions.length > 0) {
      setIsModalVisible(false);
    } else {
      setIsModalVisible(true);
    }
  }, [dispatch]);

  console.log("questionlists", questionList);

  const getQuestion = () => {
    answers.current = questionList.map((question: Question) => {
      return {
        id: question.id,
        correctanswer: question.answer1,
      };
    });
    setQuestion(questionList);
    setIsModalVisible(false);
  };

  const userSubmit = async (listAns: Array<Answer>) => {
    dispatch(questionAction.submit(listAns));
  };

  const clickNext = () => {
    setQuestionIndex((questionIndex) => questionIndex + 1);
    console.log("asw", answers.current);
  };

  const clickPrevious = () => {
    setQuestionIndex((questionIndex) => questionIndex - 1);
  };

  const clickSubmit = () => {
    dispatch(questionAction.submit(answers.current));
    Swal.fire({
      html: "Calculating point...",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    setTimeout(() => {
      setIsSubmitVisible(true);
      console.log("cr", correctResult);
    }, 2000);
  };

  const logout = () => {
    const logoutToken: UserLogout = {
      refreshToken: localStorage.getItem("refresh_token"),
    };
    dispatch(authAction.signOut({ logoutToken, navigate }));
    setIsSubmitVisible(false);

    Swal.fire({
      html: "Logout...",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  return (
    <div>
      <div className="my-header-question">
        <b className="number-question">
          {questionIndex + 1} / {questions.length} questions
        </b>
        <i className="user-name">{localStorage.getItem("current_user")}</i>
      </div>
      <Space
        align="center"
        direction="vertical"
        style={{ display: "flex", marginTop: 100 }}
      >
        {questions.length > 0 ? (
          <Card
            title={questions[questionIndex]?.question}
            style={{ width: 1000 }}
          >
            <Radio.Group
              defaultValue={answers.current[questionIndex]?.correctanswer}
              onChange={onRadioChange}
              key={questions[questionIndex].id}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Radio value={questions[questionIndex].answer1}>
                  {questions[questionIndex].answer1}
                </Radio>
                <Radio value={questions[questionIndex].answer2}>
                  {questions[questionIndex].answer2}
                </Radio>
                <Radio value={questions[questionIndex].answer3}>
                  {questions[questionIndex].answer3}
                </Radio>
                <Radio value={questions[questionIndex].answer4}>
                  {questions[questionIndex].answer4}
                </Radio>
              </Space>
            </Radio.Group>
          </Card>
        ) : null}
        <Space size="middle" style={{ marginTop: 30 }}>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            disabled={questionIndex === 0}
            onClick={clickPrevious}
          >
            Previous Question{" "}
          </Button>
          {questionIndex === questions.length - 1 ? (
            <Button type="primary" onClick={clickSubmit}>
              {" "}
              Submit{" "}
            </Button>
          ) : (
            <Button type="primary" onClick={clickNext}>
              {" "}
              Save & Next question <ArrowRightOutlined />
            </Button>
          )}
        </Space>
      </Space>
      <Modal
        title="Welcome to the Quiz"
        centered
        visible={isModalVisible}
        closable={false}
        footer={null}
      >
        Let's start Quiz{"   "}
        <Button type="primary" onClick={getQuestion}>
          Start {"-->"}
        </Button>
      </Modal>
      <Modal
        title="You done the Quiz"
        centered
        visible={isSubmitVisible}
        closable={false}
        footer={null}
      >
        <ResultComponent answers={answers.current} questions={questions} />
        <Button type="primary" onClick={logout}>
          Logout{" "}
        </Button>
      </Modal>
    </div>
  );
};

interface QuestionProps {
  answers: any;
  questions: Question[];
}

const ResultComponent = ({ answers, questions }: QuestionProps) => {
  const correctResult = useAppSelector((state) => state.question.result);
  console.log("crs", correctResult);
  console.log("ques", questions);
  console.log("ans", answers);
  return (
    <Row>
      <Col span={8}>
        <b>Questions</b>
        {answers.map((myAnswer: any) => (
          <div>
            {
              questions.find((allQuestion) => allQuestion.id === myAnswer.id)
                ?.question
            }
          </div>
        ))}
      </Col>
      <Col span={8}>
        <b>Your Answer:</b>
        {answers.map((myAnswer: any) => (
          <div>{myAnswer.correctanswer}</div>
        ))}
      </Col>
      <Col span={8}>
        <b>Correct Answer:</b>
        {correctResult.map((correctAnswer: Result) => (
          <div
            style={{ color: correctAnswer.result === true ? "green" : "red" }}
          >
            {correctAnswer.correctanswer}
          </div>
        ))}
      </Col>
      <b>
        Your Score:{" "}
        {
          correctResult.filter(
            (correctAnswer: Result) => correctAnswer.result === true
          ).length
        }{" "}
        / {questions.length}
      </b>
    </Row>
  );
};
export default QuestionComponent;
