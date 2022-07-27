import { Link } from "react-router-dom";

const SidebarHeader = () => {
  return (
    <div className="sidebar-header">
      <div className="sidebar-header-add">
        <Link to={"/home/new"}>
          <i class="ri-add-circle-fill"></i>
        </Link>
      </div>
    </div>
  );
};

export default SidebarHeader;
