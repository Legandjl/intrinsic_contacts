import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./errors.css";

const Page401 = () => {
  const nav = useNavigate();
  useEffect(() => {
    nav(`/unauthorised`, { replace: true });
  }, [nav]);

  return <div className="error-page"></div>;
};

export default Page401;
