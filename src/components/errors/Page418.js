import { Link } from "react-router-dom";

const Page418 = () => {
  return (
    <div className="error-page">
      {" "}
      <p>Oops!, something went wrong!</p>
      <p>Return</p>
      <Link to={"/home"}>Home</Link>
    </div>
  );
};

export default Page418;
