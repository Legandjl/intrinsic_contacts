import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import icon from "./icon.png";

import "./header.css";
import { ContactContext } from "../../context/ContactContext";

const Header = () => {
  const { logout, user } = useContext(AuthContext);
  const { contacts } = useContext(ContactContext);

  return (
    <div className="header">
      <div className="header-icon-wrap">
        {user && (
          <Link
            to={
              contacts.length === 0
                ? "/home/welcome"
                : `/home/contact/${contacts[0].id}`
            }
          >
            <img alt={"icon"} src={icon} />
          </Link>
        )}
      </div>
      <div className="header-functions">
        {user && (
          <Link to={"/profile"}>
            <i className="ri-user-2-fill"></i>
          </Link>
        )}
        {user && <i onClick={logout} className="ri-logout-circle-line"></i>}
      </div>
    </div>
  );
};

export default Header;
