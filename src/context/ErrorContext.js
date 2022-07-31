import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Oops from "../components/errors/Oops";
import Page401 from "../components/errors/Page401";
import Page403 from "../components/errors/Page403";
import Page404 from "../components/errors/Page404";
import Page418 from "../components/errors/Page418";

const ErrorContext = React.createContext();

const ErrorContextProvider = ({ children }) => {
  const location = useLocation();
  const [errorStatusCode, setErrorStatusCode] = useState();
  const [statusText, setStatusText] = useState();

  useEffect(() => {
    // Listen for changes to the current location.
    // remove status code on location change
    setErrorStatusCode(undefined);
    setStatusText(undefined);
  }, [location]);

  const updateCode = (code) => {
    setErrorStatusCode(code);
  };

  const updateText = (text) => {
    setStatusText(text);
  };
  const renderContent = () => {
    if (errorStatusCode === 401) {
      return <Page401 />;
    }

    if (errorStatusCode === 403) {
      console.log("403");
      return <Page403 />;
    }

    if (errorStatusCode === 404) {
      return <Page404 />;
    }

    if (errorStatusCode === 418) {
      return <Page418 code={errorStatusCode} text={statusText} />;
    }

    if (errorStatusCode > 400) {
      return <Oops code={errorStatusCode} />;
    } else {
      return children;
    }
  };

  return (
    <ErrorContext.Provider value={{ updateCode, updateText }}>
      {renderContent()}
    </ErrorContext.Provider>
  );
};

export { ErrorContext, ErrorContextProvider };
