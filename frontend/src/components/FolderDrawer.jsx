import React, { useState } from "react";
import { ReactComponent as Folder } from "../assets/folder-solid.svg";
import { ReactComponent as FolderOpen } from "../assets/folder-open-solid.svg";

function FolderDrawer({ name, onAdd = () => {}, children }) {
  const [open, setOpen] = useState(false);

  const handleSwitchOpen = () => {
    setOpen(!open);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd();
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center w-full gap-2 p-2 cursor-pointer hover:bg-sky-300 hover:bg-opacity-30"
        onClick={handleSwitchOpen}
      >
        <Folder className="h-5 aspect-square fill-stone-300" />
        <p className="font-medium capitalize select-none">{name}</p>
        <img
          className="w-4 h-4 ml-auto cursor-pointer select-none aspect-square"
          src={"/icons/plus-solid.svg"}
          alt=""
          onClick={handleAdd}
        />
      </div>
      {open && children}
    </div>
  );
}

export default FolderDrawer;
