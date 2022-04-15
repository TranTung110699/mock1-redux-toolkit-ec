import { Button, Menu } from "antd";
import {
  QuestionCircleOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import { UserLogout } from "../../models/User";
import { authAction } from "../../features/auth/authSlice";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../app/hooks";

const HeaderComponent = () => {
  const [current, setCurrent] = useState("question-manage");
  const navigate = useNavigate();
  const handleClick = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(`/admin/${e.key}`);
  };

  const dispatch = useAppDispatch();

  const logout = () => {
    const logoutToken: UserLogout = {
      refreshToken: localStorage.getItem("refresh_token"),
    };
    dispatch(authAction.signOut({ logoutToken, navigate }));

    Swal.fire({
      html: "Logout...",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };
  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="question-manage" icon={<QuestionCircleOutlined />}>
          Manage Question
        </Menu.Item>
        <Menu.Item key="user-manage" icon={<UserOutlined />}>
          Manage User
        </Menu.Item>
        {/* <Menu.Item icon={<LoginOutlined />}>Logout</Menu.Item> */}
        <Menu.Item>
          <Button
            type="default"
            icon={<LoginOutlined />}
            onClick={logout}
            danger
          >
            Logout{" "}
          </Button>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default HeaderComponent;
