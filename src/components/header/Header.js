import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./header.css";

const Header = () => {
  const { logout, user } = useContext(AuthContext);
  return (
    <div className="header">
      {user && <i onClick={logout} className="ri-logout-circle-line"></i>}
    </div>
  );
};

export default Header;
