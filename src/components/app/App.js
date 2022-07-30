import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import { ContactContextProvider } from "../../context/ContactContext";
import { ErrorContextProvider } from "../../context/ErrorContext";
import ContactForm2 from "../form/ContactForm";
import Header from "../header/Header";
import Home from "../home/Home";
import Login from "../login/Login";
import Protected from "../protected/Protected";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <ErrorContextProvider>
        <AuthContextProvider>
          <ContactContextProvider>
            <Header />
            <Routes>
              <Route element={<Protected />}>
                <Route path="home" element={<Home />}>
                  <Route path="welcome" element={<p></p>} />
                  <Route path="contact/:id" element={<ContactForm2 />} />
                  <Route path="contact/new" element={<ContactForm2 />} />
                </Route>
              </Route>
              <Route path={"/"} element={<Login />} />
            </Routes>
          </ContactContextProvider>
        </AuthContextProvider>
      </ErrorContextProvider>
    </div>
  );
};

export default App;
