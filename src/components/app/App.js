import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import Login from "../login/Login";
import "./App.css";

const App = () => {
  return (
    <AuthContextProvider>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Login />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
};

export default App;
