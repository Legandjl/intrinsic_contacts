import { Link, useParams } from "react-router-dom";
import "./display.css";
const Display = () => {
  const { id } = useParams();

  return (
    <div className="display">
      <Link to={`/home/contact/edit/${id}`}>LINK</Link>
    </div>
  );
};

export default Display;
