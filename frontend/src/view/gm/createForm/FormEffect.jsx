import React from "react";

import { useAction } from "../../../actions/action";
import { Controller } from "react-hook-form";
import { alignments } from "../../../libs/types";

import CreateForm from "../../../components/CreateForm";

import Input from "../../../components/inputs/Input";
import InputImage from "../../../components/inputs/InputImage";
import TextArea from "../../../components/inputs/TextArea";
import Select from "../../../components/inputs/Select";
import ModifiersInputs from "../../../components/array/ModifiersInputs";

function FormEffect() {
  const action = useAction();

  const handleAdd = (folder) => {
    action.effects.add(
      {
        name: "New Effect",
        folder: folder._id,
        icon: "defaults\\magic-swirl.png",
        description: null,
        alignment: "good",
        duration: 0,
        modifiers: [],
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleEdit = (id, data) => {
    action.effects.edit(data, id, (error) => {
      console.log(error);
    });
  };

  const handleDelete = (effect) => {
    action.effects.delete(effect._id, (error) => {
      console.log(error);
    });
  };

  const handleChangeFolder = (id, folder) => {
    action.effects.edit(
      {
        folder: folder,
      },
      id,
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <CreateForm
      docName="effects"
      folderType="effects"
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onChangeFolder={handleChangeFolder}
      defaultValues={{
        name: "",
        icon: "",
        description: null,
        alignment: "",
        duration: 0,
        modifiers: [],
      }}
    >
      {(register, control, errors) => (
        <>
          <Input
            placeholder="Name"
            {...register("name", {
              required: "This field cannot be empty",
              minLength: {
                value: 2,
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
            name="alignment"
            control={control}
            rules={{
              required: "This field cannot be empty",
            }}
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={"Alignment"}
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
          <Controller
            name="modifiers"
            control={control}
            render={({ field: { value, onChange } }) => (
              <ModifiersInputs
                values={value}
                onChange={(value) => onChange(value)}
              />
            )}
          />
        </>
      )}
    </CreateForm>
  );
}

export default FormEffect;
