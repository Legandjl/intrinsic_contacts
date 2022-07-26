import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import "./home.css";
const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Home;
