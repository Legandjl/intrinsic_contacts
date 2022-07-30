import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";
import Contact from "../contacts/Contact";
import "./sidebar.css";
import SidebarHeader from "./SidebarHeader";
const Sidebar = () => {
  const { contacts } = useContext(ContactContext);
  const contactLinks = contacts.map((item) => {
    return <Contact data={item} key={item.id} />;
  });
  return (
    <div className="sidebar">
      <SidebarHeader />
      <div className="sidebar-inner">{contactLinks}</div>
    </div>
  );
};

export default Sidebar;
