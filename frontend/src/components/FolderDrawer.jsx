import React, { useImperativeHandle, useRef, useState } from "react";
import { ReactComponent as Folder } from "../assets/folder-solid.svg";
import { ReactComponent as FolderOpen } from "../assets/folder-open-solid.svg";
import { Button as MUIButton, Menu, MenuItem } from "@mui/base";
import ModalContainer from "./ModalContainer";
import Button from "./buttons/Button";

const FolderDrawer = React.forwardRef(function FolderDrawer(
  {
    name,
    padding = 8,
    canCreateFolder = false,
    onAdd = () => {},
    onRename = () => {},
    onDelete = () => {},
    onAddFolder = () => {},
    children,
    ...rest
  },
  ref
) {
  const buttonMenuRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setDrawerOpen(true);
    },
    close: () => {
      setDrawerOpen(false);
    },
  }));

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

  const handleAddFolder = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    onAddFolder();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setDeleteModalOpen(false);
    onDelete();
  };

  const handleOpenDeleteModal = (e) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
    setMenuOpen(false);
  };

  const handleOpenMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div
        className="flex flex-col bg-stone-500 bg-opacity-30"
        {...rest}
        ref={ref}
      >
        <div
          className={`flex items-center w-full gap-2 p-2 cursor-pointer hover:bg-sky-300 hover:bg-opacity-30`}
          style={{ paddingLeft: `${padding}px` }}
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
          <MUIButton
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
          </MUIButton>
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
            {canCreateFolder && (
              <MenuItem
                className="px-2 cursor-pointer hover:bg-stone-300 hover:bg-opacity-25"
                onClick={handleAddFolder}
              >
                Add Folder
              </MenuItem>
            )}
            <MenuItem
              className="px-2 cursor-pointer hover:bg-stone-300 hover:bg-opacity-25"
              onClick={handleOpenDeleteModal}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
        {drawerOpen && children}
      </div>
      <ModalContainer
        title="ARE YOU SUR ?"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <div className="flex flex-col w-full gap-4 pt-4">
          <Button name="Delete" color="danger" onClick={handleDelete} />
        </div>
      </ModalContainer>
    </>
  );
});

export default FolderDrawer;
