import { Link } from "react-router-dom";
import sad from "./sad.png";

const Page404 = () => {
  return (
    <div className="error-page">
      {" "}
      <div className="not-found">
        <h1>404</h1>
        <img alt="sad" src={sad} />
        <h2>Page not found</h2>
        <p className="error-p">The page or resource does not exist</p>
        <div className="return-link">
          <p>Return</p>
          <Link to={"/home"}>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
