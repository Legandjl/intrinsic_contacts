import { useCallback, useContext, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import Contact from "../contacts/Contact";
import "./sidebar.css";
import SidebarHeader from "./SidebarHeader";
const Sidebar = () => {
  const { contacts } = useContext(ContactContext);
  const [filterVal, setFilterVal] = useState("");

  const handleFilter = useCallback((searchStr) => {
    setFilterVal(searchStr);
  }, []);

  const contactLinks = contacts.map((item) => {
    return (
      item.contactName.toLowerCase().includes(filterVal.toLowerCase()) && (
        <Contact data={item} key={item.id} />
      )
    );
  });
  return (
    <div className="sidebar">
      <SidebarHeader handleFilter={handleFilter} />
      <div className="sidebar-inner">{contactLinks}</div>
    </div>
  );
};

export default Sidebar;
