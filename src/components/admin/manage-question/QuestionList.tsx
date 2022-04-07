import {
  Button,
  Card,
  Col,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Table,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { adminQuestionAction } from "../../../features/admin/manage-question/adminQuestionSlice";
import { PlusOutlined } from "@ant-design/icons";
import "../admin.css";
import Column from "antd/lib/table/Column";
import { questionApi } from "../../../api/questionApi";
import { AdminQuestion, AdminQuestionOutput } from "../../../models/Question";
import Swal from "sweetalert2";

const QuestionListComponent = () => {
  const { id } = useParams();
  const [myPage, setMypage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalPages = useRef(0);

  const questionList = useAppSelector(
    (state) => state.adminQuestion.questions.results
  );
  const myTotalPages = useAppSelector(
    (state) => state.adminQuestion.questions.totalPages
  );
  useEffect(() => {
    dispatch(adminQuestionAction.getAdminQuestion({ page: myPage }));
  }, [dispatch]);

  const clickDetail = (idQuestion: string) => {
    window.scrollTo(0, 0);
    navigate("/admin/question-manage/" + idQuestion);
  };

  const clickDelete = (idQuestion: string) => {
    dispatch(adminQuestionAction.deleteAdminQuestion(idQuestion));
    Swal.fire({
      html: "Deleting...",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    setTimeout(() => {
      dispatch(adminQuestionAction.getAdminQuestion({ page: myPage }));
    }, 2000);
  };

  const onChangePage = (pageNumber: number) => {
    setMypage(pageNumber);
    dispatch(adminQuestionAction.getAdminQuestion({ page: pageNumber }));
  };

  const cancel = () => {};

  const clickAddQuestion = () => {
    navigate("/admin/question-manage");
  };
  return (
    <div>
      {questionList.length > 0 ? (
        <div className="site-card-wrapper">
          {id ? (
            <Space align="center" style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size="large"
                onClick={clickAddQuestion}
              >
                Add Question
              </Button>
            </Space>
          ) : null}
          <Row gutter={[8, 8]}>
            {questionList.map((question: AdminQuestionOutput, index: any) => (
              <Col xs={24} sm={24} md={12} lg={12}>
                <Card title={question.question} bordered={false}>
                  <div>
                    <b>A. </b>
                    {question.answer1}
                  </div>
                  <div>
                    <b>B. </b>
                    {question.answer2}
                  </div>
                  <div>
                    <b>C. </b>
                    {question.answer3}
                  </div>
                  <div>
                    <b>D. </b>
                    {question.answer4}
                  </div>
                  <hr />
                  <div>
                    <b>Correct Answer: </b>
                    <i style={{ color: "green" }}>{question.correctanswer}</i>
                  </div>
                  <a
                    onClick={() => {
                      clickDetail(question.id);
                    }}
                  >
                    Detail
                  </a>
                  |
                  <Popconfirm
                    title="Are you sure to delete this question?"
                    onConfirm={() => {
                      clickDelete(question.id);
                    }}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a>Delete</a>
                  </Popconfirm>
                </Card>
              </Col>
            ))}
          </Row>
          <Row justify="end" style={{ marginTop: 10 }}>
            <Pagination
              defaultCurrent={1}
              total={myTotalPages * 10}
              onChange={onChangePage}
            />
          </Row>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionListComponent;
