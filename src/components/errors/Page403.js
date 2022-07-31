import { Link } from "react-router-dom";
import "./errors.css";
import angry from "./angry.png";

const Page403 = () => {
  console.log("rendering");

  return (
    <div className="error-page">
      {" "}
      <div className="forbidden">
        <h1>403</h1>
        <img alt="angry" src={angry} />
        <h2>Forbidden</h2>
        <p className="error-p">
          You do not have permission to access this resource
        </p>
        <div className="return-link">
          <p>Return</p>
          <Link to={"/home"}>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Page403;
