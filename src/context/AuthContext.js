import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [fetchData, loadingData] = useFetch();
  const LOCAL_TOKEN = "intrinsic_token";
  const LOCAL_USER = "intrinsic_user";

  const setLocal = (name, data) => {
    localStorage.setItem(name, data);
  };

  const login = async (username, password) => {
    if (loadingData) {
      return;
    }
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
      null
    );
    setLocal(LOCAL_TOKEN, loginData.token);
    setLocal(LOCAL_USER, loginData.username);
    setUser(loginData.username);
    setToken(loginData.token);
    setLoading(false);
    return loginData;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setLocal(LOCAL_TOKEN, "");
    setLocal(LOCAL_USER, "");
  };

  useEffect(() => {
    // Attempt to fetch data from a protected resource
    const attemptLogin = async () => {
      console.log("trying to login");
      setLoading(true);
      const localToken = localStorage.getItem(LOCAL_TOKEN);
      const localUser = localStorage.getItem(LOCAL_USER);
      console.log(localUser);
      if (!localToken || !localUser) {
        console.log("nothing");
        return;
      }
      const testLogin = await fetchData(
        `profile?name=${localUser.displayName}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${localToken}` },
        },
        () => {
          setToken(null);
          setLocal(LOCAL_TOKEN, "");
          setUser(null);
          setLocal(LOCAL_USER, "");
        }
      );
      console.log(testLogin);
      if (testLogin) {
        //Authenticated
        setLocal(LOCAL_TOKEN, localToken);
        setLocal(LOCAL_USER, testLogin);
        setToken(localToken);
        setUser(localUser);
      }
      setLoading(false);
    };
    if (!loading && !token) {
      attemptLogin();
    }
  }, [fetchData, loading, token]);

  return (
    <AuthContext.Provider value={{ logout, login, token, loading, user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
