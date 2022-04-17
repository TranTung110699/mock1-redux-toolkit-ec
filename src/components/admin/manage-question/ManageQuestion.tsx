import { Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import "../admin.css";
import QuestionListComponent from "./QuestionList";
import QuestionFormComponent from "./QuestionForm";
import { useNavigate, useParams } from "react-router-dom";
import QuestionAddFormComponent from "./QuestionAddForm";

const ManageQuestionComponent = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(1);
  const navigate = useNavigate();
  console.log("pageCurrent", message);

  const callbackFunction = (childData: number) => {
    setMessage(childData);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    // setIsModalVisible(false);
    navigate("/admin/question-manage");
  };

  useEffect(() => {
    if (window.location.pathname === "/admin/question-manage/add" || id) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  });
  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "35px" }}>
        <b>Manage Question</b>
      </div>
      <Row>
        <QuestionListComponent parentCallback={callbackFunction} />
        <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
          {id ? <QuestionFormComponent dataFromParent={message} /> : null}
          {window.location.pathname === "/admin/question-manage/add" ? (
            <QuestionAddFormComponent dataFromParent={message} />
          ) : null}
        </Modal>
      </Row>
    </div>
  );
};

export default ManageQuestionComponent;
