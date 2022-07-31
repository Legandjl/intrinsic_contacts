import { Link } from "react-router-dom";
import teapot from "./teapot.png";

const Page418 = (props) => {
  return (
    <div className="error-page">
      {" "}
      <div className="not-found">
        <h1>{props.code}</h1>
        <img alt="teapot" src={teapot} />
        <p className="error-p">{props.text}</p>
        <div className="return-link">
          <p>Return</p>
          <Link to={"/home"}>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Page418;
