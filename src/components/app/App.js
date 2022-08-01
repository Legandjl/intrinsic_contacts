import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import { ContactContextProvider } from "../../context/ContactContext";
import { ErrorContextProvider } from "../../context/ErrorContext";
import { UserContextProvider } from "../../context/UserContext";
import Forbidden from "../errors/Forbidden";
import Page404 from "../errors/Page404";
import Unauthorised from "../errors/Unauthorised";
import ContactForm2 from "../form/ContactForm";
import Header from "../header/Header";
import Home from "../home/Home";
import SubmitLoader from "../loaders/SubmitLoader";
import Login from "../login/Login";
import Profile from "../profile/Profile";
import Protected from "../protected/Protected";
import Welcome from "../welcome/Welcome";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <ErrorContextProvider>
        <AuthContextProvider>
          <ContactContextProvider>
            <UserContextProvider>
              <Header />
              <Routes>
                <Route element={<Protected />}>
                  <Route path="profile" element={<Profile />} />
                  <Route path="home" element={<Home />}>
                    <Route path="welcome" element={<Welcome />} />
                    <Route path="contact/:id" element={<ContactForm2 />} />
                    <Route path="contact/new" element={<ContactForm2 />} />
                    <Route
                      path="contact/submit/success"
                      element={<SubmitLoader />}
                    />
                  </Route>
                </Route>
                <Route path={"/unauthorised"} element={<Unauthorised />} />
                <Route path={"/forbidden"} element={<Forbidden />} />
                <Route path={"/"} element={<Login />} />

                <Route path="/404" element={<Page404 />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </UserContextProvider>
          </ContactContextProvider>
        </AuthContextProvider>
      </ErrorContextProvider>
    </div>
  );
};

export default App;
