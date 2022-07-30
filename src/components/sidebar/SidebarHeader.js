import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useInput from "../../hooks/useInput";

const SidebarHeader = (props) => {
  const [value, handleChange, reset, isValid] = useInput();
  const location = useLocation();

  useEffect(() => {
    props.handleFilter(value);
  }, [props, value]);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="sidebar-header">
      <div className="user-search-wrap">
        <input
          className={"user-search"}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={"Search contacts..."}
        />
      </div>
      <div className="sidebar-header-add">
        <Link to={"/home/contact/new"}>
          <i className="ri-add-circle-fill"></i>
        </Link>
      </div>
    </div>
  );
};

export default SidebarHeader;
