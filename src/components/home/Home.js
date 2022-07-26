import { useState } from "react";
import Display from "../display/Display";
import Sidebar from "../sidebar/Sidebar";
import "./home.css";
const Home = () => {
  const [currentTab, setCurrentTab] = useState(0);
  console.log(currentTab);
  const switchTab = () => {
    setCurrentTab((prev) => {
      return prev === 0 ? 1 : 0;
    });
  };
  return (
    <div className="home">
      <Sidebar switchTab={switchTab} />
      <Display />
    </div>
  );
};
export default Home;
