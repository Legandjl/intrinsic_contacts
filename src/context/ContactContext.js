import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useDataLoad from "../hooks/useDataLoad";
import useFetch from "../hooks/useFetch";

import { AuthContext } from "./AuthContext";
const ContactContext = React.createContext();

const ContactContextProvider = (props) => {
  const { user, token } = useContext(AuthContext);
  const [fetchData, loadingData] = useFetch();
  const nav = useNavigate();
  const [contacts, refresh, loadingContacts, error, addOne, removeOne] =
    useDataLoad(
      `contacts?name=${user}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      },
      null
    );

  const [countries, refreshCountries, loadingCountries] = useDataLoad(
    `utility/countries`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
    null
  );

  const removeContact = async (id) => {
    await fetchData(
      `contacts/${id}?name=${user}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      null
    );
    removeOne(id);
    nav(`/home`, { replace: true });
  };

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
        removeContact,
        loadingContacts,
        countries,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactContextProvider };
