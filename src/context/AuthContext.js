import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [fetchData, loadingData] = useFetch();
  const [loginError, setLoginError] = useState(false);
  const LOCAL_TOKEN = "intrinsic_token";
  const LOCAL_USER = "intrinsic_user";

  const setLocal = (name, data) => {
    localStorage.setItem(name, data);
  };

  const login = async (username, password) => {
    if (loadingData) {
      return;
    }
    setLoginError(false);
    setLoading(true);
    const loginData = await fetchData(
      "auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
      failLogin
    );

    if (loginData) {
      setLocal(LOCAL_TOKEN, loginData.token);
      setLocal(LOCAL_USER, loginData.username);
      setUser(loginData.username);
      setToken(loginData.token);
    }
    setLoading(false);
  };

  const failLogin = () => {
    setLoginError(true);
    logout();
  };

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setLocal(LOCAL_TOKEN, "");
    setLocal(LOCAL_USER, "");
    setLoading(false);
  }, []);

  useEffect(() => {
    const attemptLogin = async () => {
      setLoading(true);
      const localToken = localStorage.getItem(LOCAL_TOKEN);
      const localUser = localStorage.getItem(LOCAL_USER);
      if (!localToken || !localUser) {
        logout();
        return;
      }
      const testLogin = await fetchData(
        `profile?name=${localUser}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${localToken}` },
        },
        logout
      );

      if (testLogin) {
        setToken(localToken);
        setUser(localUser);
      }
      setLoading(false);
    };
    if (loading && !token) {
      attemptLogin();
    }
  }, [fetchData, loading, logout, token, user]);

  return (
    <AuthContext.Provider
      value={{ logout, login, token, loading, user, loginError }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
