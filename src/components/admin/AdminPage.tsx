import React, { useState } from "react";
// import "./admin.scss";
import UserListComponent from "./manage-user/UserList";
import { store } from "../../app/store";
import { Outlet } from "react-router-dom";
import HeaderComponent from "./Header";

const AdminPageComponent = () => {
  return (
    <div>
      <div>
        <HeaderComponent />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPageComponent;
