import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./errors.css";
const Unauthorised = () => {
  const nav = useNavigate();
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
    setTimeout(() => {
      nav(`/`, { replace: true });
    }, 5000);
  }, [logout, nav, token]);
  return (
    <div className="error-page">
      <h1>401</h1>
      <p>Unauthorised, re-directing to login page...</p>
      <div className="return-link">
        {" "}
        <p>If you are not automatically redirected, click </p>{" "}
        <Link to={`/`}> here</Link>
      </div>
    </div>
  );
};

export default Unauthorised;
