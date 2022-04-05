import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  return isLoggedIn;
};

export default function Guard() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={"/"} />;
}
