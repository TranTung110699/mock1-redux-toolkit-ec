import { Col, Row } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UserAddFormComponent from "./UserAddForm";
import UserEditFormComponent from "./UserEditForm";
import UserListComponent from "./UserList";

// import "../admin.scss";

const ManageUserComponent = () => {
  const { id } = useParams();
  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "35px" }}>
        <b>Manage User</b>
      </div>
      <Row>
        <Col span={14}>
          <UserListComponent />
        </Col>
        <Col span={10}>
          {id ? <UserEditFormComponent /> : <UserAddFormComponent />}
        </Col>
      </Row>
    </div>
  );
};

export default ManageUserComponent;
