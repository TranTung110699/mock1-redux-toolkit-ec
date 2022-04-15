import { Col, Row } from "antd";
import React, { useState } from "react";
import "../admin.css";
import QuestionListComponent from "./QuestionList";
import QuestionFormComponent from "./QuestionForm";
import { useParams } from "react-router-dom";
import QuestionAddFormComponent from "./QuestionAddForm";

const ManageQuestionComponent = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(1);
  console.log("pageCurrent", message);

  const callbackFunction = (childData: number) => {
    setMessage(childData);
  };
  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "35px" }}>
        <b>Manage Question</b>
      </div>
      <Row>
        <Col
          span={
            window.location.pathname === "/admin/question-manage/add" || id
              ? 16
              : 24
          }
        >
          <QuestionListComponent parentCallback={callbackFunction} />
        </Col>
        <Col
          span={
            window.location.pathname === "/admin/question-manage/add" || id
              ? 8
              : 0
          }
        >
          {id ? <QuestionFormComponent dataFromParent={message} /> : null}
          {window.location.pathname === "/admin/question-manage/add" ? (
            <QuestionAddFormComponent dataFromParent={message} />
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default ManageQuestionComponent;
