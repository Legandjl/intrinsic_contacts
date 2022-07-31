import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Protected = () => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default Protected;
