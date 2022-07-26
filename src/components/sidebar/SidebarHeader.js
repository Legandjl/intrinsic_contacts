import { Link } from "react-router-dom";

const SidebarHeader = () => {
  return (
    <div className="sidebar_header">
      <i class="ri-add-circle-line"></i>
      <Link to={"/home/new"}>link</Link>
    </div>
  );
};

export default SidebarHeader;
