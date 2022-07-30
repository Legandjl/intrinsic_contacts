import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import { ContactContextProvider } from "../../context/ContactContext";
import { ErrorContextProvider } from "../../context/ErrorContext";

import ContactForm2 from "../form/ContactForm";
import Header from "../header/Header";
import Home from "../home/Home";
import Login from "../login/Login";
import Protected from "../protected/Protected";
import Sidebar from "../sidebar/Sidebar";
import "./App.css";

/* const App = () => {
  return (
    <AuthContextProvider>
      <ContactContextProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route element={<Protected />}>
              <Route path="home" element={<Home />}>
                <Route path="contact/:id" element={<ContactForm2 />} />
                <Route path="new" element={<ContactForm2 />} />
              </Route>
            </Route>
            <Route path={"/"} element={<Login />} />
          </Routes>
        </div>
      </ContactContextProvider>
    </AuthContextProvider>
  );
};*/

const App = () => {
  return (
    <ErrorContextProvider>
      <AuthContextProvider>
        <ContactContextProvider>
          <div className="App">
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
          </div>
        </ContactContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  );
};

export default App;
