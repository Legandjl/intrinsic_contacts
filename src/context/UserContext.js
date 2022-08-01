import React, { useContext } from "react";
import useDataLoad from "../hooks/useDataLoad";
import { AuthContext } from "./AuthContext";
const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const { user, token } = useContext(AuthContext);

  const [profile, refreshProfile] = useDataLoad(
    `profile?name=${user}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
    null
  );

  return (
    <UserContext.Provider value={{ profile, refreshProfile }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
