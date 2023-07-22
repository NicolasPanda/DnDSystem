import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useDoc } from "@syncstate/react";
import { alignments, effectTypes } from "../../../libs/types";

import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import ModalContainer from "../../../components/ModalContainer";
import { useAction } from "../../../actions/action";
import FolderDrawer from "../../../components/FolderDrawer";

function CreateEffectForm() {
  const action = useAction();

  const [folders] = useDoc("/folders");

  const [folderNameModalOpen, setFolderNameModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      icon: "",
      description: "",
      alignments: "",
      duration: 0,
      modifiers: [],
    },
  });

  const handleOpenCreateFolder = () => {
    setFolderNameModalOpen(true);
    setFolderName("");
  };

  const handleCloseCreateFolder = () => {
    setFolderNameModalOpen(false);
    setFolderName("");
  };

  const handleCreateFolder = () => {
    action.folders.addFolder(
      {
        name: folderName,
        type: "effects",
        order: 0,
      },
      (error) => {
        console.log(error);
      }
    );
    handleCloseCreateFolder();
  };

  return (
    <>
      <div className="flex w-full h-full">
        {/* side bare */}
        <div className="flex flex-col w-64 h-full overflow-hidden rounded-lg bg-stone-500">
          <div className="flex justify-center w-full bg-stone-700">
            <h2 className="p-2 text-lg font-bold capitalize text-stone-100">
              Effects list
            </h2>
          </div>
          <div className="flex flex-col h-full overflow-y-scroll scroll">
            {folders.map((folder, index) => (
              <FolderDrawer
                key={index}
                name={folder.name}
                onAdd={() => console.log("add")}
              >
                <div className="flex items-center gap-2 p-2 py-1 pl-5 cursor-pointer hover:bg-sky-300 hover:bg-opacity-30">
                  <span className="frame">
                    <img
                      className="h-6 select-none aspect-square"
                      src={`${
                        process.env.REACT_APP_SERVER_URI
                      }/files/${encodeURIComponent("")}`}
                      alt=""
                    />
                  </span>
                  <p className="capitalize select-none">name</p>
                </div>
              </FolderDrawer>
            ))}
          </div>

          <Button
            className="mt-auto"
            name="Add Folder"
            onClick={handleOpenCreateFolder}
          />
        </div>
        {/* Form */}
        <div className="flex flex-col px-8 grow">
          <Input
            {...register("name", {
              required: "This field cannot be empty",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 28,
                message: "Max. 12 characters for the name",
              },
            })}
            error={errors.name?.message}
          />
        </div>
      </div>
      <ModalContainer
        title="Folder name"
        open={folderNameModalOpen}
        onClose={handleCloseCreateFolder}
      >
        <div className="flex flex-col w-full gap-4 pt-4">
          <Input
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <Button name="Create" onClick={handleCreateFolder} />
        </div>
      </ModalContainer>
    </>
  );
}

export default CreateEffectForm;
