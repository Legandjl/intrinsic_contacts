import { Link } from "react-router-dom";
import sad from "./sad.png";

const Oops = (props) => {
  return (
    <div className="error-page">
      {" "}
      <div className="not-found">
        <h1>{props.code}</h1>
        <img alt="sad" src={sad} />
        <h2>Oops, something went wrong</h2>
        <p className="error-p">
          If this problem persists, please contact support
        </p>
        <div className="return-link">
          <p>Return</p>
          <Link to={"/home"}>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Oops;
