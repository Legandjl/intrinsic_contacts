import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useInput from "../../hooks/useInput";
import "./login.css";

const Login = () => {
  const { login, token, loading } = useContext(AuthContext);
  const [username, handleUsername] = useInput("");
  const [password, handlePassword] = useInput("");
  const nav = useNavigate();

  useEffect(() => {
    //if token is present and authcontext is not loading, nav to home
    if (token && !loading) {
      nav(`/home`, { replace: true });
    }
  }, [loading, nav, token]);

  return (
    <div className="loginWrap">
      {!token && (
        <input
          name={"username"}
          type="text"
          placeholder="Username"
          onChange={handleUsername}
          value={username}
        />
      )}
      {!token && (
        <input
          name={"password"}
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          value={password}
        />
      )}

      {!token && (
        <button
          onClick={() => {
            login(username, password);
          }}
        >
          login
        </button>
      )}
    </div>
  );
};
export default Login;
