import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDataLoad from "../hooks/useDataLoad";
import useFetch from "../hooks/useFetch";

import { AuthContext } from "./AuthContext";
const ContactContext = React.createContext();

const ContactContextProvider = (props) => {
  const { user, token } = useContext(AuthContext);
  const [fetchData] = useFetch();
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

  const [countries] = useDataLoad(
    `utility/countries`,
    {
      method: "GET",
    },
    null
  );

  const getIndex = (id) => {
    return contacts.map((object) => object.id).indexOf(id);
  };

  const removeContact = async (id) => {
    const data = await fetchData(
      `contacts/${id}?name=${user}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${""}`,
        },
      },
      null
    );

    if (data) {
      const index = getIndex(id);
      removeOne(id);
      if (index === 0) {
        nav(`/home/welcome`, { replace: true });
        return;
      }
      nav(`/home/contact/${contacts[index - 1].id}`, { replace: true });
    }
  };

  const submitContact = async (contactDetails, id) => {
    setSubmittingContact(true);
    const data = await fetchData(
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
    if (data) {
      refresh();
      nav(`/home/contact/submit/success`, { replace: true });
      setSubmittingContact(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        submitContact,
        removeContact,
        loadingContacts,
        countries,
        submittingContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactContextProvider };
