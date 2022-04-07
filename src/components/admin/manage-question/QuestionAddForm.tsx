import { Button, Form, Input, Radio, Row, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../app/hooks";
import { adminQuestionAction } from "../../../features/admin/manage-question/adminQuestionSlice";
import { AdminQuestion } from "../../../models/Question";
// import "../admin.scss";

const QuestionAddFormComponent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    const question: AdminQuestion = {
      ...values,
      correctanswer: values[values.correctanswer],
    };
    dispatch(adminQuestionAction.postAdminQuestion(question));

    Swal.fire({
      html: "Creat...",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    setTimeout(() => {
      dispatch(adminQuestionAction.getAdminQuestion({ page: 1 }));
      form.resetFields();
    }, 2000);
  };

  const onFinishFailed = () => {};

  return (
    <div>
      <Row justify="center">
        <h1>Add Question</h1>
      </Row>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 15,
        }}
        initialValues={{
          correctanswer: "answer1",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
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
          label="Correct Answer"
          rules={[{ required: true, message: "Please pick an answer!" }]}
        >
          <Radio.Group>
            <Radio value="answer1">Answer 1</Radio>
            <Radio value="answer2">Answer 2</Radio>
            <Radio value="answer3">Answer 3</Radio>
            <Radio value="answer4">Answer 4</Radio>
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
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuestionAddFormComponent;
