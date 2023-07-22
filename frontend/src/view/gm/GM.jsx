import React from "react";

import Chat from "../../components/chat/Chat";
import ToolBar from "./ToolBar";

function GM() {
  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col flex-grow">
          <div className="flex h-20 bg-stone-700">turn</div>
          <div className="flex flex-col flex-grow">entity</div>
          <div className="flex items-center w-full px-4 fill-orange-200 h-14 bg-stone-900">
            <ToolBar />
          </div>
        </div>
        <Chat className={"w-[450px]"} />
      </div>
    </>
  );
}

export default GM;
