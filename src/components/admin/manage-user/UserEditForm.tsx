import { Button, Form, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { adminUserAction } from "../../../features/admin/manage-user/adminUserSlice";
import { ManageUser, UserUpdate } from "../../../models/User";
// import "../admin.scss";

interface patchUserType {
  user: UserUpdate;
  userId: string;
}

const UserEditFormComponent = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: any }>();

  const userById = useAppSelector((state) => state.adminUser.getUserById);

  const [userDetail, setUserDetail] = useState<ManageUser>();

  useEffect(() => {
    dispatch(adminUserAction.getAdminUserById(id));
    setUserDetail(undefined);
  }, [id]);

  console.log("abc", userDetail);

  const onShowDetail = () => {
    setUserDetail(userById);
  };

  const onFinish = (values: UserUpdate) => {
    const formInput: patchUserType = {
      user: values,
      userId: id,
    };
    dispatch(adminUserAction.patchAdminUser(formInput));
    Swal.fire({
      html: "Update...",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    setTimeout(() => {
      navigate("/admin/user-manage");
      dispatch(adminUserAction.getAdminUser({ page: props.dataFromParent }));
    }, 2000);
  };

  const onFinishFailed = () => {};

  const clickBack = () => {
    navigate("/admin/question-manage");
  };
  return (
    <div style={{ padding: "0px 20px" }}>
      <Row justify="center">
        <h1>User Detail</h1>
      </Row>
      <Row justify="center">
        <Button type="primary" onClick={onShowDetail}>
          Show Detail
        </Button>
      </Row>
      {userDetail ? (
        <div>
          <div>
            <b>Username: </b>
          </div>
          <hr />
          <div
            style={{
              color: userDetail.role === "admin" ? "green" : "orange",
            }}
          >
            <b style={{ color: "black" }}>Role: </b>
            {userDetail.role}
          </div>
          <hr />
          <div>
            <b>Email: </b>
            {userDetail.email}
          </div>
          <hr />
          <div>
            <b>Email Verified: </b>
            {userDetail.isEmailVerified}
          </div>
          <div>
            <b>Avatar: </b>
            <img
              width={"80px"}
              height={"80px"}
              src={userDetail.avatar}
              alt={userDetail.username}
            />
          </div>
          <hr />
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 15,
            }}
            initialValues={{
              avatar: userDetail.avatar,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[
                {
                  required: true,
                  message: "Please input your avatar link!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* <Row justify="center">
              <div className="row my-4">
                <div className="col">
                  <img
                    width={"80px"}
                    height={"80px"}
                    src={userDetail.avatar}
                    alt="Preview"
                  />
                </div>
              </div>
            </Row> */}

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
                <a onClick={clickBack}>Back to Userlist</a>
              </Space>
            </Form.Item>
          </Form>
        </div>
      ) : null}
    </div>
  );
};

export default UserEditFormComponent;
