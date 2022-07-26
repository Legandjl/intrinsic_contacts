import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
const ContentContext = React.createContext();

const ContactContextProvider = (props) => {
  const [contacts, setContacts] = useState([]);
  const [fetchData, fetchInProgress, error] = useFetch();

  const addOne = (newObj) => {
    setContacts((prev) => {
      return [newObj].concat([...prev]);
    });
  };

  const removeOne = (id) => {
    setContacts((prev) => {
      const newArr = prev.filter((item) => {
        return item.id !== id;
      });
      return newArr;
    });
  };

  return (
    <ContentContext.Provider
      value={{
        contacts,
        addOne,
        removeOne,
      }}
    >
      {props.children}
    </ContentContext.Provider>
  );
};

export { ContentContext, ContactContextProvider };
