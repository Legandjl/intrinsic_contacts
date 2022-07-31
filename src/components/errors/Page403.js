import { useNavigate } from "react-router-dom";
import "./errors.css";
import { useEffect } from "react";

const Page403 = () => {
  const nav = useNavigate();
  useEffect(() => {
    nav(`/forbidden`, { replace: true });
  }, [nav]);
  return <div className="error-page"></div>;
};

export default Page403;
