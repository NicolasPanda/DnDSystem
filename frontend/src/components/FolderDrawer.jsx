import React, { useRef, useState } from "react";
import { ReactComponent as Folder } from "../assets/folder-solid.svg";
import { ReactComponent as FolderOpen } from "../assets/folder-open-solid.svg";
import { Button, Menu, MenuItem } from "@mui/base";

function FolderDrawer({
  name,
  onAdd = () => {},
  onRename = () => {},
  onDelete = () => {},
  children,
}) {
  const buttonMenuRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSwitchDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd();
  };

  const handleRename = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    onRename();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    onDelete();
  };

  const handleOpenMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center w-full gap-2 p-2 cursor-pointer hover:bg-sky-300 hover:bg-opacity-30"
        onClick={handleSwitchDrawerOpen}
      >
        {drawerOpen ? (
          <FolderOpen className="h-5 aspect-square fill-stone-300" />
        ) : (
          <Folder className="h-5 aspect-square fill-stone-300" />
        )}
        <p className="font-medium capitalize select-none">{name}</p>
        <img
          className="w-4 h-4 ml-auto cursor-pointer select-none aspect-square"
          src={"/icons/plus-solid.svg"}
          alt=""
          onClick={handleAdd}
        />
        <Button
          className="p-2 rounded-full"
          ref={buttonMenuRef}
          onClick={handleOpenMenu}
          aria-controls={menuOpen ? "simple-menu" : undefined}
          aria-expanded={menuOpen || undefined}
          aria-haspopup="menu"
        >
          <img
            className="w-4 h-4 ml-auto cursor-pointer select-none aspect-square"
            src={"/icons/ellipsis-vertical-solid.svg"}
            alt=""
          />
        </Button>
        <Menu
          className="py-2 rounded-md bg-stone-900 text-stone-100"
          open={menuOpen}
          onOpenChange={(open) => setMenuOpen(open)}
          anchorEl={buttonMenuRef.current}
          slotProps={{ listbox: { id: "simple-menu" } }}
        >
          <MenuItem
            className="px-2 cursor-pointer hover:bg-stone-300 hover:bg-opacity-25"
            onClick={handleRename}
          >
            Rename
          </MenuItem>
          <MenuItem
            className="px-2 cursor-pointer hover:bg-stone-300 hover:bg-opacity-25"
            onClick={handleDelete}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
      {drawerOpen && children}
    </div>
  );
}

export default FolderDrawer;
