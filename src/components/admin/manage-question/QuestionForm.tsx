import { Button, Form, Input, Radio, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { adminQuestionAction } from "../../../features/admin/manage-question/adminQuestionSlice";
// import "../admin.scss";
import { ManageUser } from "../../../models/User";
import { AdminQuestion, AdminQuestionOutput } from "../../../models/Question";
interface patchQuestionType {
  question: AdminQuestion;
  questionId: string;
}

const QuestionFormComponent = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: any }>();
  const page = props.dataFromParent;
  const questionById = useAppSelector(
    (state) => state.adminQuestion.getQuesById
  );

  const [questionDetail, setQuestionDetail] = useState<AdminQuestionOutput>();
  const [enableDetail, setEnableDetail] = useState(true);

  useEffect(() => {
    dispatch(
      adminQuestionAction.getAdminQuestionById({ id, setQuestionDetail })
    );
    // setQuestionDetail(undefined);
    // setEnableDetail(true);
    // setTimeout(() => {
    //   setEnableDetail(false);
    // }, 1500);
  }, [id]);

  console.log("abc", questionDetail);
  console.log("Test page refresh: ", questionById);

  // const onShowDetail = () => {
  //   navigate("/admin/question-manage");
  // };

  const onFinish = (values: AdminQuestion) => {
    const formInput: patchQuestionType = {
      question: values,
      questionId: id,
    };
    dispatch(
      adminQuestionAction.patchAdminQuestion({
        formInput,
        dispatch,
        page,
        navigate,
      })
    );
    Swal.fire({
      html: "Update...",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const onFinishFailed = () => {};

  const clickBack = () => {
    navigate("/admin/question-manage");
  };

  return (
    <div>
      <Row justify="center">
        <h1>Question Detail</h1>
      </Row>
      {/* <Row justify="center">
        <Button type="primary" onClick={onShowDetail}>
          Show Detail
        </Button>
      </Row> */}
      {questionDetail ? (
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 15,
          }}
          initialValues={{
            question: questionDetail.question,
            answer1: questionDetail.answer1,
            answer2: questionDetail.answer2,
            answer3: questionDetail.answer3,
            answer4: questionDetail.answer4,
            correctanswer: questionDetail.correctanswer,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Question"
            name="question"
            rules={[
              {
                required: true,
                message: "Please input your question!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Answer 1"
            name="answer1"
            rules={[
              {
                required: true,
                message: "Please input your Answer 1!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Answer 2"
            name="answer2"
            rules={[
              {
                required: true,
                message: "Please input your Answer 2!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Answer 3"
            name="answer3"
            rules={[
              {
                required: true,
                message: "Please input your Answer 3!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Answer 4"
            name="answer4"
            rules={[
              {
                required: true,
                message: "Please input your Answer 4!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="correctanswer"
            label="Correct"
            rules={[{ required: true, message: "Please pick an answer!" }]}
          >
            <Radio.Group>
              <Radio value={questionDetail.answer1}>Answer1</Radio>
              <br />
              <Radio value={questionDetail.answer2}>Answer2</Radio>
              <br />
              <Radio value={questionDetail.answer3}>Answer3</Radio>
              <br />
              <Radio value={questionDetail.answer4}>Answer4</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                Edit
              </Button>
              <a onClick={clickBack}>Back to dashboard</a>
            </Space>
          </Form.Item>
        </Form>
      ) : null}
    </div>
  );
};

export default QuestionFormComponent;
