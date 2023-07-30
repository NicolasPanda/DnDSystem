import React, { useState } from "react";
import { ReactComponent as Trash } from "../assets/trash-sharp-regular.svg";
import { Button as MUIButton } from "@mui/base";
import ModalContainer from "./ModalContainer";
import Button from "./buttons/Button";

const ItemDrawer = React.forwardRef(function ItemDrawer(
  { icon, name, padding = 20, selected, onClick, onDelete, style, ...rest },
  ref
) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  return (
    <>
      <div
        ref={ref}
        className={`flex items-center gap-2 p-2 py-1 pl-5 cursor-pointer hover:bg-sky-300 hover:bg-opacity-30 ${
          selected && "bg-purple-500 bg-opacity-30 hover:bg-purple-500"
        }`}
        style={{ paddingLeft: `${padding}px`, ...style }}
        onClick={onClick}
        {...rest}
      >
        <span className="frame">
          <img
            className="h-6 select-none aspect-square"
            src={`${
              process.env.REACT_APP_SERVER_URI
            }/files/${encodeURIComponent(icon)}`}
            alt=""
          />
        </span>
        <p className="capitalize select-none">{name}</p>
        <MUIButton onClick={handleDelete} className="ml-auto">
          <Trash className={`h-4 right-3 fill-zinc-100 flex ml-auto mr-2.5`} />
        </MUIButton>
      </div>

      <ModalContainer
        title="ARE YOU SUR ?"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <div className="flex flex-col w-full gap-4 pt-4">
          <Button name="Delete" color="danger" onClick={onDelete} />
        </div>
      </ModalContainer>
    </>
  );
});

export default ItemDrawer;
