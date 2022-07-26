import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import Header from "../header/Header";
import Home from "../home/Home";
import Login from "../login/Login";
import Protected from "../protected/Protected";
import "./App.css";

const App = () => {
  return (
    <AuthContextProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path={"/"} element={<Login />} />

          <Route
            path={"/home"}
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
        </Routes>
      </div>
    </AuthContextProvider>
  );
};

export default App;
