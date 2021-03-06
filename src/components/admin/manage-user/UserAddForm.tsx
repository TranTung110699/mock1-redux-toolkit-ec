import { Button, Form, Input, Radio, Row, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../app/hooks";
import { adminUserAction } from "../../../features/admin/manage-user/adminUserSlice";
import { UserCreate } from "../../../models/User";
// import "../admin.scss";

const UserAddFormComponent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    console.log("testCreatUser", values);
    const user: UserCreate = {
      ...values,
      role: values.role,
    };
    dispatch(adminUserAction.postAdminUser(user));

    Swal.fire({
      html: "Creat...",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    setTimeout(() => {
      dispatch(adminUserAction.getAdminUser({ page: 1 }));
      form.resetFields();
    }, 2000);
  };

  const onFinishFailed = () => {};

  return (
    <div>
      <Row justify="center">
        <h1>Add User</h1>
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
          role: "user",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please pick a role!" }]}
        >
          <Radio.Group>
            <Radio value="user">User</Radio>
            <Radio value="admin">Admin</Radio>
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
              Add User
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserAddFormComponent;
