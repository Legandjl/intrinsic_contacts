import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import { ContactContextProvider } from "../../context/ContactsContext";

import Display from "../display/Display";
import ContactForm from "../form/ContactForm";
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
                <Route path="user/:id" element={<Display />} />
                <Route path="new/:id" element={<ContactForm />} />
                <Route path="new" element={<ContactForm />} />
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
