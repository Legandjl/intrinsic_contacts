import { useContext } from "react";
import { ContentContext } from "../../context/ContactsContext";
import "./sidebar.css";
import SidebarHeader from "./SidebarHeader";
const Sidebar = () => {
  const { contacts } = useContext(ContentContext);
  const contactLinks = contacts.map((item) => {
    return <div className="contact_link"></div>;
  });

  return (
    <div className="sidebar">
      <SidebarHeader />
      <div className="sidebar_inner">{contactLinks}</div>
    </div>
  );
};

export default Sidebar;
