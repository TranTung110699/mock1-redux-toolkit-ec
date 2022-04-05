import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginComponent from "./components/login/Login";
import RegisterComponent from "./components/register/Register";
import UserPageComponent from "./components/user/UserPage";
import AdminPageComponent from "./components/admin/AdminPage";
import ManageQuestionComponent from "./components/admin/manage-question/ManageQuestion";
import ManageUserComponent from "./components/admin/manage-user/ManageUser";
import Guard from "./utils/PrivateRoute";
import UserAddFormComponent from "./components/admin/manage-user/UserAddForm";
import UserEditFormComponent from "./components/admin/manage-user/UserEditForm";
import UserDetailComponent from "./components/admin/manage-user/UserDetail";
import { Spin, Alert } from "antd";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route element={<Guard />}>
          <Route path="/user" element={<UserPageComponent />} />
          <Route path="/admin" element={<AdminPageComponent />}>
            <Route
              path="/admin"
              element={<Navigate to="/admin/question-manage" replace />}
            />
            <Route
              path="/admin/question-manage"
              element={<ManageQuestionComponent />}
            />

            <Route path="/admin/user-manage" element={<ManageUserComponent />}>
              <Route
                path="/admin/user-manage/add-form"
                element={<UserAddFormComponent />}
              />

              <Route
                path="/admin/user-manage/edit-form"
                element={<UserEditFormComponent />}
              />

              <Route
                path="/admin/user-manage/detail"
                element={<UserDetailComponent />}
              />
            </Route>
          </Route>
        </Route>
        {/* <Redirect exact from="**" to="/user" /> */}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
}

export default App;
