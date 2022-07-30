import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./errors.css";
import sad from "./sad.png";

const Page401 = () => {
  /*
  const nav = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      nav(`/login`, { replace: true });
    }, 5000);
  }, []);*/

  return (
    <div className="error-page">
      <img alt="sad" src={sad} /> <p>Oops, something went wrong!</p>
      <div className="return-link">
        <p>Return</p>
        <Link to={"/home"}>Home</Link>
      </div>
    </div>
  );
};

export default Page401;
