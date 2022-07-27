import { useParams } from "react-router-dom";
import "./display.css";
const Display = () => {
  const { id } = useParams();

  return <div className="display"></div>;
};

export default Display;
