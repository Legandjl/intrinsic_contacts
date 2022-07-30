import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDataLoad from "../hooks/useDataLoad";
import useFetch from "../hooks/useFetch";

import { AuthContext } from "./AuthContext";
const ContactContext = React.createContext();

const ContactContextProvider = (props) => {
  const { user, token } = useContext(AuthContext);
  const [fetchData, loadingData] = useFetch();
  const [submittingContact, setSubmittingContact] = useState(false);

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
    const index = contacts.map((object) => object.id).indexOf(id);
    removeOne(id);

    if (index === 0) {
      nav(`/home/welcome`, { replace: true });
      return;
    }
    nav(`/home/contact/${contacts[index - 1].id}`, { replace: true });
  };

  const submitContact = async (contactDetails, id) => {
    setSubmittingContact(true);
    await fetchData(
      `contacts${id !== undefined ? `/${id}` : ""}?name=${user}`,
      {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contactDetails),
      },
      null
    );
    setSubmittingContact(false);
    refresh();
  };

  const getCountry = (iso) => {
    const country = countries.filter((country) => {
      return (countries.isoCode = iso);
    });
    return country[0];
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addOne,
        removeOne,
        submitContact,
        removeContact,
        loadingContacts,
        countries,
        getCountry,
        submittingContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactContextProvider };
