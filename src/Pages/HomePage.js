import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const HomePage = () => {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <SideBar />
      <Outlet />
    </div>
  );
};

export default HomePage;
