import React, { useState } from "react";

import Chat from "../../components/chat/Chat";
import ModalContainer from "../../components/ModalContainer";
import ToolBar from "./ToolBar";

function GM() {
  const [ModalCrystalOpen, setModalCrystalOpen] = useState(false);

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
      <ModalContainer
        open={ModalCrystalOpen}
        onClose={() => setModalCrystalOpen(false)}
      />
    </>
  );
}

export default GM;
