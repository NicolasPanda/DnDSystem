import React from "react";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="relative flex flex-col w-full overflow-y-auto ">
      <Outlet />
    </div>
  );
}

export default Main;
