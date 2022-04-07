import { Col, Row } from "antd";
import React, { useState } from "react";
import "../admin.css";
import QuestionListComponent from "./QuestionList";
import QuestionFormComponent from "./QuestionForm";
import { useParams } from "react-router-dom";
import QuestionAddFormComponent from "./QuestionAddForm";

const ManageQuestionComponent = () => {
  const { id } = useParams();
  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "35px" }}>
        <b>Manage Question</b>
      </div>
      <Row>
        <Col span={16}>
          <QuestionListComponent />
        </Col>
        <Col span={8}>
          {id ? <QuestionFormComponent /> : <QuestionAddFormComponent />}
        </Col>
      </Row>
    </div>
  );
};

export default ManageQuestionComponent;
