import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// import "../admin.scss";

const ManageUserComponent = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ManageUserComponent;
