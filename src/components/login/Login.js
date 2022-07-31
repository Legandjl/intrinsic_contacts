import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ContactContext } from "../../context/ContactContext";
import useInput from "../../hooks/useInput";
import icon from "./icon.png";
import "./login.css";

const Login = () => {
  const { login, token, loading, loginError } = useContext(AuthContext);
  const { contacts, loadingContacts, loadingCountries } =
    useContext(ContactContext);
  const [username, handleUsername] = useInput("");
  const [password, handlePassword] = useInput("");
  const nav = useNavigate();

  useEffect(() => {
    // if contacts.length === 0
    //if token is present and authcontext is not loading, nav to home
    if (token && !loading && !loadingContacts) {
      if (contacts.length === 0) {
        nav(`/home/welcome`, { replace: true });
      } else {
        nav(`/home/contact/${contacts[0].id}`, { replace: true });
      }
    }
  }, [contacts, loading, loadingContacts, loadingCountries, nav, token]);

  return (
    <div className="login-wrap">
      <img alt={"icon"} src={icon} />

      <input
        className="login-input"
        name={"username"}
        type="text"
        placeholder="Username"
        onChange={handleUsername}
        value={username}
        disabled={token || loading}
      />

      <input
        className="login-input"
        name={"password"}
        type="password"
        placeholder="Password"
        onChange={handlePassword}
        value={password}
        disabled={token || loading}
      />

      <button
        disabled={token || loading}
        className="login-button"
        onClick={() => {
          login(username, password);
        }}
      >
        Login
      </button>
      {loginError && <p className="login-error">Incorrect details entered</p>}
    </div>
  );
};
export default Login;
