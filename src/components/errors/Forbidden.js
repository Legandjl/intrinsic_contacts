import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import angry from "./angry.png";

import "./errors.css";
const Forbidden = () => {
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
      <div className="forbidden">
        <h1>403</h1>
        <img alt="angry" src={angry} />
        <h2>Forbidden</h2>
        <p className="error-p">Re-directing to login page...</p>
        <div className="return-link">
          {" "}
          <p>If you are not automatically redirected, click </p>{" "}
          <Link to={`/`}> here</Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
