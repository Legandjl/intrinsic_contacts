import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ContactContext } from "../../context/ContactContext";

import Sidebar from "../sidebar/Sidebar";
import "./home.css";
const Home = () => {
  const { contacts, loadingContacts } = useContext(ContactContext);
  const nav = useNavigate();
  /*Outlet is new to me, I needed to find a way to allow 
    the sidebar to be present in all routes but still hidden if not authenticated
     */

  return (
    <div className="home">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Home;
