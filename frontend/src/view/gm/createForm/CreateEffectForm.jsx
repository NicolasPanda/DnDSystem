import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { useDoc } from "@syncstate/react";
import { alignments, effectTypes } from "../../../libs/types";

import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import ModalContainer from "../../../components/ModalContainer";
import { useAction } from "../../../actions/action";
import FolderDrawer from "../../../components/FolderDrawer";
import InputImage from "../../../components/inputs/InputImage";
import TextArea from "../../../components/inputs/TextArea";
import Select from "../../../components/inputs/Select";

function CreateEffectForm() {
  const action = useAction();

  const [folders] = useDoc("/folders");
  const [effects] = useDoc("/effects");

  const [folderDeleteModalOpen, setFolderDeleteModalOpen] = useState(false);
  const [folderNameModalOpen, setFolderNameModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [currentRenameFolder, setCurrentRenameFolder] = useState(null);
  const [currentDeleteFolder, setCurrentDeleteFolder] = useState(null);

  const [currentEffect, setCurrentEffect] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      icon: "",
      description: null,
      alignments: "",
      duration: 0,
      modifiers: [],
    },
  });

  const handleCreate = (data) => {
    console.log(data);
  };

  const handleOpenCreateFolder = () => {
    setFolderNameModalOpen(true);
    setFolderName("");
  };

  const handleCloseCreateFolder = () => {
    setFolderNameModalOpen(false);
    setCurrentRenameFolder(null);
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

  const handleOpenRenameFolder = (folder) => {
    setFolderNameModalOpen(true);
    setCurrentRenameFolder(folder);
    setFolderName(folder.name);
  };

  const handleRenameFolder = () => {
    console.log(currentRenameFolder);
    action.folders.editFolder(
      {
        name: folderName,
      },
      currentRenameFolder._id,
      (error) => {
        console.log(error);
      }
    );
    handleCloseCreateFolder();
  };

  const handleOpenDeleteFolder = (folder) => {
    setFolderDeleteModalOpen(true);
    setCurrentDeleteFolder(folder);
  };

  const handleDeleteFolder = () => {
    action.folders.deleteFolder(currentDeleteFolder._id, (error) => {
      console.log(error);
    });
    setFolderDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex w-full h-full pb-8">
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
                onRename={() => handleOpenRenameFolder(folder)}
                onDelete={() => handleOpenDeleteFolder(folder)}
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
        <div className="flex flex-col gap-4 px-8 py-4 overflow-y-scroll grow scroll">
          <Input
            placeholder="Name"
            {...register("name", {
              required: "This field cannot be empty",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 28,
                message: "Max. 28 characters for the name",
              },
            })}
            error={errors.name?.message}
          />
          <Controller
            name="icon"
            control={control}
            rules={{
              required: "This field cannot be empty",
            }}
            render={({ field: { value, onChange } }) => (
              <InputImage
                placeholder={"Icon"}
                value={value}
                onChange={(file) => onChange(file)}
                error={errors.icon?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextArea value={value} onChange={onChange} />
            )}
          />
          <Controller
            name="alignments"
            control={control}
            rules={{
              required: "This field cannot be empty",
            }}
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={"Alignments"}
                options={alignments}
                value={value}
                onChange={(value) => onChange(value)}
                error={errors.alignments?.message}
              />
            )}
          />
          <Input
            number
            placeholder="Duration"
            {...register("duration", {
              required: "This field cannot be empty",
              valueAsNumber: true,
            })}
            error={errors.duration?.message}
          />
          <div className="flex justify-end w-full mt-auto">
            <Button name="Create" onClick={handleSubmit(handleCreate)} />
          </div>
        </div>
      </div>
      <ModalContainer
        title="Folder name"
        open={folderNameModalOpen}
        onClose={handleCloseCreateFolder}
      >
        <div className="flex flex-col w-full gap-4 pt-4">
          <Input
            autoFocus
            onFocus={(e) => e.target.select()}
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <Button
            name="Validate"
            onClick={
              currentRenameFolder ? handleRenameFolder : handleCreateFolder
            }
          />
        </div>
      </ModalContainer>
      <ModalContainer
        title="ARE YOU SUR ?"
        open={folderDeleteModalOpen}
        onClose={() => setFolderDeleteModalOpen(false)}
      >
        <div className="flex flex-col w-full gap-4 pt-4">
          <Button name="Delete" color="danger" onClick={handleDeleteFolder} />
        </div>
      </ModalContainer>
    </>
  );
}

export default CreateEffectForm;
