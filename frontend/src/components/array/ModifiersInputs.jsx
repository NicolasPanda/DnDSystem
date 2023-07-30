import React, { useEffect, useState } from "react";
import Select from "../inputs/Select";
import { effectTypes, operations } from "../../libs/types";
import { ReactComponent as ChevronDown } from "../../assets/chevron-down-sharp-regular.svg";
import { ReactComponent as ChevronRight } from "../../assets/chevron-right-sharp-regular.svg";
import { ReactComponent as Trash } from "../../assets/trash-sharp-regular.svg";

import Input from "../inputs/Input";
import { Button as MUIButton } from "@mui/base";
import ModalContainer from "../ModalContainer";
import Button from "../buttons/Button";

function ModifiersInputs({
  values = [],
  onChange = () => {},
  className = "",
  placeholder = "Modifiers",
}) {
  const [drawer, setDrawer] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentDeleteIndex, setCurrentDeleteIndex] = useState(null);

  //set the drawer to the length of the values and keep the previous valuess
  useEffect(() => {
    setDrawer((prev) => {
      let newDrawer = [...prev];
      for (let i = 0; i < values.length; i++) {
        if (newDrawer[i] === undefined) {
          newDrawer[i] = false;
        }
      }
      return newDrawer;
    });
  }, [values]);

  const handleDrawer = (index) => {
    let newDrawer = [...drawer];
    newDrawer[index] = !newDrawer[index];
    setDrawer(newDrawer);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onChange([
      ...values,
      { effectType: "applyDamagePhy", magnitude: 1, operation: "add" },
    ]);
  };

  const handleOpenDeleteModal = (e, index) => {
    e.stopPropagation();
    setCurrentDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    let newDrawer = [...drawer];
    newDrawer.splice(currentDeleteIndex, 1);
    setDrawer(newDrawer);
    onChange(values.filter((_, i) => i !== currentDeleteIndex));
    setDeleteModalOpen(false);
    setCurrentDeleteIndex(null);
  };

  const onModifierChange = (index, key, value) => {
    const newValue = [...values];
    newValue[index][key] = value;
    onChange(newValue);
  };

  return (
    <>
      <div
        className={`w-full flex flex-col gap-4 relative px-3 py-2 leading-tight border rounded shadow border-stone-600 text-stone-100 bg-stone-700 focus:outline-none focus:shadow-outline ${className}`}
      >
        <label
          htmlFor={placeholder}
          className="absolute text-xs transition-all -top-2.5 text-stone-300 left-1 peer-placeholder-shown:top-auto peer-placeholder-shown:left-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400"
        >
          {placeholder}
        </label>

        {values.map((value, index) => (
          <div
            className="flex flex-col w-full overflow-hidden rounded-md bg-stone-500"
            key={index}
          >
            <div
              className="flex w-full gap-4 p-3 cursor-pointer bg-stone-800"
              onClick={() => handleDrawer(index)}
            >
              <h2 className="mr-auto capitalize">
                {value.operation} {value.magnitude} {value.effectType}
              </h2>
              <MUIButton onClick={(e) => handleOpenDeleteModal(e, index)}>
                <Trash className={`h-5 right-3 fill-zinc-100 flex ml-auto`} />
              </MUIButton>
              {drawer[index] ? (
                <ChevronDown
                  className={`h-5 right-3 fill-zinc-100 flex aspect-square`}
                />
              ) : (
                <ChevronRight
                  className={`h-5 right-3 fill-zinc-100 flex aspect-square`}
                />
              )}
            </div>
            {drawer[index] && (
              <div className="flex flex-col gap-3 p-4">
                <Select
                  placeholder={"Operation"}
                  options={operations}
                  value={value.operation}
                  onChange={(value) =>
                    onModifierChange(index, "operation", value)
                  }
                />
                <Input
                  number
                  placeholder="magnitude"
                  value={value.magnitude}
                  onChange={(e) =>
                    onModifierChange(index, "magnitude", e.target.value)
                  }
                />
                <Select
                  placeholder={"Effect Type"}
                  options={effectTypes}
                  value={value.effectType}
                  onChange={(value) =>
                    onModifierChange(index, "effectType", value)
                  }
                />
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-end w-full">
          <img
            className="w-6 h-6 p-1 ml-auto bg-blue-500 rounded-full cursor-pointer select-none aspect-square"
            src={"/icons/plus-solid.svg"}
            alt=""
            onClick={handleAdd}
          />
        </div>
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
}

export default ModifiersInputs;
