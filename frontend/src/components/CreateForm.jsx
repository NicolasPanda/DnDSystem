import React, { createRef, useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { useDoc } from "@syncstate/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAction } from "../actions/action";

import ModalContainer from "./ModalContainer";
import FolderDrawer from "./FolderDrawer";
import ItemDrawer from "./ItemDrawer";
import Input from "./inputs/Input";
import Button from "./buttons/Button";

function CreateForm({
  folderType = "effects",
  docName = "effects",
  onAdd = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onChangeFolder = () => {},
  defaultValues = {},
  children,
}) {
  const action = useAction();

  const [folders] = useDoc("/folders", Infinity);
  const [items] = useDoc(`/${docName}`, Infinity);

  const folderRef = useRef({});

  const [currentFolders, setCurrentFolders] = useState([]);
  const [folderNotEmptyOpen, setFolderNotEmptyOpen] = useState(false);
  const [folderNameModalOpen, setFolderNameModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [currentParentFolder, setCurrentParentFolder] = useState(null);
  const [currentRenameFolder, setCurrentRenameFolder] = useState(null);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const [currentClickWaiting, setCurrentClickWaiting] = useState(null);

  const [currentItem, setCurrentItem] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: defaultValues,
  });

  //reset the form when the current item changes
  useEffect(() => {
    const newItem = items.find((item) => item._id === currentItem);
    reset(newItem);
  }, [currentItem, reset, items]);

  //set current folders
  useEffect(() => {
    setCurrentFolders(folders?.filter((folder) => folder.type === folderType));
  }, [folders, folderType]);

  //create refs for folders
  useEffect(() => {
    currentFolders.forEach((folder) => {
      if (!folderRef?.current?.[folder._id]) {
        folderRef.current[folder._id] = createRef();
      }
    });
  }, [currentFolders]);

  const handleAdd = (folder) => {
    onAdd(folder);
    folderRef.current[folder._id].current.open();
  };

  const handleEdit = (data) => {
    onEdit(currentItem, data);
  };

  const handleDelete = (effect) => {
    onDelete(effect);

    if (currentItem === effect._id) {
      setCurrentItem(null);
    }
  };

  const handleChangeFolder = (id, folder) => {
    onChangeFolder(id, folder);
  };

  //Item selection

  const checkPreventUnsaved = (item) => {
    if (isDirty) {
      setCurrentClickWaiting(item);
      setUnsavedModalOpen(true);
      return;
    }
    setCurrentItem(item._id);
    setUnsavedModalOpen(false);
  };

  const handleSelect = () => {
    setCurrentItem(currentClickWaiting._id);
    setUnsavedModalOpen(false);
  };

  const handleSelectAndEdit = () => {
    setCurrentItem(currentClickWaiting._id);
    setUnsavedModalOpen(false);
    handleSubmit(handleEdit)();
  };

  //FOLDERS

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
        type: folderType,
        parent: null,
      },
      (error) => {
        console.log(error);
      }
    );
    handleCloseCreateFolder();
  };

  const handleOpenCreateChildFolder = (folder) => {
    setFolderNameModalOpen(true);
    setCurrentParentFolder(folder);
    setFolderName("");
    folderRef.current[folder._id].current.open();
  };

  const handleCloseCreateChildFolder = () => {
    setFolderNameModalOpen(false);
    setCurrentParentFolder(null);
    setFolderName("");
  };

  const handleCreateChildFolder = () => {
    action.folders.addFolder(
      {
        name: folderName,
        type: folderType,
        parent: currentParentFolder._id,
      },
      (error) => {
        console.log(error);
      }
    );
    handleCloseCreateChildFolder();
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

  const handleDeleteFolder = (folder) => {
    //check if folder is empty
    const childFolder = folders.find(
      (folderInFolder) => folderInFolder.parent === folder._id
    );

    const itemsInFolder = items.find((item) => item.folder === folder._id);

    if (childFolder || itemsInFolder) {
      setFolderNotEmptyOpen(true);
      return;
    }

    action.folders.deleteFolder(folder._id, (error) => {
      console.log(error);
    });
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    handleChangeFolder(draggableId, destination.droppableId);
    folderRef.current[destination.droppableId].current.open();
  };

  return (
    <>
      <div className="flex w-full h-full pb-8">
        {/* side bare */}
        <div className="flex flex-col w-64 h-full overflow-hidden rounded-lg bg-stone-500">
          <div className="flex justify-center w-full bg-stone-700">
            <h2 className="p-2 text-lg font-bold capitalize text-stone-100">
              {folderType} list
            </h2>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col h-full overflow-y-scroll scroll">
              {currentFolders
                .filter((folder) => !folder.parent)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((folder, index) => (
                  <Droppable key={index + folder._id} droppableId={folder._id}>
                    {(providedFolderDrop) => (
                      <div
                        ref={providedFolderDrop.innerRef}
                        {...providedFolderDrop.droppableProps}
                      >
                        <FolderDrawer
                          name={folder.name}
                          canCreateFolder
                          onAdd={() => handleAdd(folder)}
                          onRename={() => handleOpenRenameFolder(folder)}
                          onDelete={() => handleDeleteFolder(folder)}
                          onAddFolder={() =>
                            handleOpenCreateChildFolder(folder)
                          }
                          ref={folderRef?.current?.[folder._id]}
                        >
                          <div className="ml-px">
                            {currentFolders
                              .filter((f) => f.parent === folder._id)
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((folder, index) => (
                                <Droppable
                                  key={index + folder._id}
                                  droppableId={folder._id}
                                >
                                  {(providedFolderDrop) => (
                                    <div
                                      ref={providedFolderDrop.innerRef}
                                      {...providedFolderDrop.droppableProps}
                                    >
                                      <FolderDrawer
                                        name={folder.name}
                                        padding={24}
                                        onAdd={() => handleAdd(folder)}
                                        onRename={() =>
                                          handleOpenRenameFolder(folder)
                                        }
                                        onDelete={() =>
                                          handleDeleteFolder(folder)
                                        }
                                        onAddFolder={() =>
                                          handleOpenCreateChildFolder(folder)
                                        }
                                        ref={folderRef?.current?.[folder._id]}
                                      >
                                        {items
                                          .filter(
                                            (item) => item.folder === folder._id
                                          )
                                          .sort((a, b) =>
                                            a.name.localeCompare(b.name)
                                          )
                                          .map((item, index) => (
                                            <Draggable
                                              key={item._id}
                                              draggableId={item._id}
                                              index={index}
                                            >
                                              {(providedFolderDrag) => (
                                                <ItemDrawer
                                                  key={index + item._id}
                                                  icon={item.icon}
                                                  name={item.name}
                                                  padding={35}
                                                  selected={
                                                    currentItem === item._id
                                                  }
                                                  onClick={() =>
                                                    checkPreventUnsaved(item)
                                                  }
                                                  onDelete={() =>
                                                    handleDelete(item)
                                                  }
                                                  ref={
                                                    providedFolderDrag.innerRef
                                                  }
                                                  {...providedFolderDrag.draggableProps}
                                                  {...providedFolderDrag.dragHandleProps}
                                                />
                                              )}
                                            </Draggable>
                                          ))}
                                      </FolderDrawer>
                                      {providedFolderDrop.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                              ))}
                          </div>
                          {items
                            .filter((item) => item.folder === folder._id)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((item, index) => (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(providedFolderDrag) => (
                                  <ItemDrawer
                                    key={index + item._id}
                                    icon={item.icon}
                                    name={item.name}
                                    selected={currentItem === item._id}
                                    onClick={() => checkPreventUnsaved(item)}
                                    onDelete={() => handleDelete(item)}
                                    ref={providedFolderDrag.innerRef}
                                    {...providedFolderDrag.draggableProps}
                                    {...providedFolderDrag.dragHandleProps}
                                  />
                                )}
                              </Draggable>
                            ))}
                        </FolderDrawer>
                        {providedFolderDrop.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
            </div>
          </DragDropContext>
          <Button
            className="mt-auto"
            name="Add Folder"
            onClick={handleOpenCreateFolder}
          />
        </div>
        {/* Form */}
        <div className="flex flex-col gap-4 px-8 py-4 overflow-y-scroll grow scroll">
          {currentItem && (
            <>
              {children(register, control, errors)}
              <div className="flex justify-end w-full mt-auto">
                <Button name="Edit" onClick={handleSubmit(handleEdit)} />
              </div>
            </>
          )}
          {!currentItem && (
            <div className="flex items-center justify-center w-full h-full">
              <h2 className="text-2xl font-bold text-stone-600">
                Select something to edit
              </h2>
            </div>
          )}
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
              currentParentFolder
                ? handleCreateChildFolder
                : currentRenameFolder
                ? handleRenameFolder
                : handleCreateFolder
            }
          />
        </div>
      </ModalContainer>
      <ModalContainer
        title="SAVE MODIFICATIONS ?"
        open={unsavedModalOpen}
        onClose={() => setUnsavedModalOpen(false)}
      >
        <div className="flex w-full gap-4 pt-4">
          <Button
            className={"w-full"}
            name="No"
            color="danger"
            onClick={handleSelect}
          />
          <Button
            className={"w-full"}
            name="Yes"
            onClick={handleSelectAndEdit}
          />
        </div>
      </ModalContainer>
      <ModalContainer
        title="Folder is not empty cannot be deleted"
        open={folderNotEmptyOpen}
        onClose={() => setFolderNotEmptyOpen(false)}
      >
        <div className="flex flex-col w-full gap-4 pt-4">
          <Button name="Ok" onClick={() => setFolderNotEmptyOpen(false)} />
        </div>
      </ModalContainer>
    </>
  );
}

export default CreateForm;
