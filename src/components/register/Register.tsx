import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { UserLogin, UserRegister } from "../../models/User";
import { useAppDispatch } from "../../app/hooks";
// import { authAction } from "../../features/auth/authSlice";
import { register } from "../../serviceWorker";
import { authAction } from "../../features/auth/authSlice";
import Swal from "sweetalert2";

interface formState {
  username: string;
  password: string;
  email: string;
}

const RegisterComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = (values: formState) => {
    console.log("Received values of form: ", values);
    const formRegister: UserRegister = {
      username: values.username,
      password: values.password,
      email: values.email,
    };
    console.log(formRegister);
    dispatch(
      authAction.signUp({
        formRegister,
        navigate,
      })
    );

    Swal.fire({
      html: "Loading",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };
  return (
    <div className="my-form-login">
      <div className="my-cover-link">
        <i>Sign up to perform the survey</i>
        <h1>Register</h1>
        <Link to="/login" className="my-link">
          Have an account
        </Link>
      </div>
      <Form
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
          className="my-label"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          className="my-label"
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
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
          className="my-label"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterComponent;
