import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import { ContactContextProvider } from "../../context/ContactContext";

import Display from "../display/Display";

import ContactForm2 from "../form/ContactForm2";
import Header from "../header/Header";
import Home from "../home/Home";
import Login from "../login/Login";
import Protected from "../protected/Protected";
import "./App.css";

const App = () => {
  return (
    <AuthContextProvider>
      <ContactContextProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route element={<Protected />}>
              <Route path="home" element={<Home />}>
                <Route index element={<Display />} />
                <Route path="contact/:id" element={<Display />} />
                <Route path="new/:id" element={<ContactForm2 />} />
                <Route path="new" element={<ContactForm2 />} />
              </Route>
            </Route>
            <Route path={"/"} element={<Login />} />
          </Routes>
        </div>
      </ContactContextProvider>
    </AuthContextProvider>
  );
};

export default App;
