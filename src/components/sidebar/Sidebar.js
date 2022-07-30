import { useContext, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import Contact from "../contacts/Contact";
import "./sidebar.css";
import SidebarHeader from "./SidebarHeader";
const Sidebar = () => {
  const { contacts } = useContext(ContactContext);
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const handleFilter = (searchStr) => {
    const filtered = contacts.filter((c) => {
      const name = c.contactName.toLowerCase();
      const str = searchStr.toLowerCase();
      return name.includes(str);
    });
    setFilteredContacts(filtered);
  };

  const contactLinks = filteredContacts.map((item) => {
    return <Contact data={item} key={item.id} />;
  });
  return (
    <div className="sidebar">
      <SidebarHeader handleFilter={handleFilter} />
      <div className="sidebar-inner">{contactLinks}</div>
    </div>
  );
};

export default Sidebar;
