import React, { useContext, useState } from "react";
import useDataLoad from "../hooks/useDataLoad";
import useFetch from "../hooks/useFetch";

import { AuthContext } from "./AuthContext";
const ContactContext = React.createContext();

const ContactContextProvider = (props) => {
  const { user, token } = useContext(AuthContext);
  const [fetchData, loadingData] = useFetch();
  const [contacts, refresh, loading, error, addOne, removeOne] = useDataLoad(
    `contacts?name=${user}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
    null
  );

  const addNew = async (contactDetails) => {
    await fetchData(
      `contacts?name=${user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contactDetails),
      },
      null
    );
    refresh();
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addOne,
        removeOne,
        addNew,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactContextProvider };
