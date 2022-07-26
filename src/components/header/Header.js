import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./header.css";

const Header = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="header">
      <div onClick={logout} className="logout">
        Logout
      </div>
    </div>
  );
};

export default Header;
