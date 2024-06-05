import React from "react";
import { Navbar } from "./components";
import { Outlet } from "react-router-dom";
import appwriteDataService from "./appwrite/services/database";
import { useSelector } from "react-redux";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
