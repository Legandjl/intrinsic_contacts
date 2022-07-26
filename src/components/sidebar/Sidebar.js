import "./sidebar.css";
import SidebarHeader from "./SidebarHeader";
const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <SidebarHeader />
      <div className="sidebar_inner"></div>
    </div>
  );
};

export default Sidebar;
