import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Protected = () => {
  const { token } = useContext(AuthContext);

  return <Outlet />;
};

export default Protected;
