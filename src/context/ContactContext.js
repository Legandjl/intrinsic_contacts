import React, { useContext, useState } from "react";
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
    const index = contacts.map((object) => object.id).indexOf(id);
    removeOne(id);
    console.log(index);

    if (index === 0) {
      console.log(id + "is 0");
      nav(`/home/welcome`, { replace: true });
      return;
    }
    nav(`/home/contact/${contacts[index - 1].id}`, { replace: true });
  };

  const submitContact = async (contactDetails, id) => {
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

    refresh();
  };

  const formatPhoneNumber = (number) => {
    let regex = /[#-]/;
    const splitNumber = number.phoneNumberFormatted.split(regex);
    return {
      category: number.category,
      areaCode: splitNumber[1] || "",
      countryCode: splitNumber[0] || "",
      extension: splitNumber[3] || "",
      number: splitNumber[2] || "",
    };
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
        formatPhoneNumber,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactContextProvider };
