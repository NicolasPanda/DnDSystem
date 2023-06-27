import React from "react";

import { useForm } from "react-hook-form";
import { alignments, effectTypes } from "../../../libs/types";

import { ReactComponent as Folder } from "../../../assets/folder-solid.svg";
import Input from "../../../components/inputs/Input";

function CreateEffectForm() {
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

  return (
    <div className="flex w-full">
      {/* side bare */}
      <div className="flex flex-col w-64 h-full overflow-hidden rounded-lg bg-stone-500">
        <div className="flex justify-center w-full bg-stone-700">
          <h2 className="p-2 text-lg font-bold capitalize text-stone-100">
            Effects list
          </h2>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center w-full gap-2 p-2 cursor-pointer hover:bg-sky-300 hover:bg-opacity-30">
            <Folder className="h-5 aspect-square fill-stone-300" />
            <p className="font-medium capitalize select-none">folder name</p>
          </div>
          <div className="flex items-center gap-2 p-2 py-1 pl-5 cursor-pointer hover:bg-sky-300 hover:bg-opacity-30">
            <span className="frame">
              <img
                className="h-6 select-none aspect-square"
                src="/assets/icons/4000_Fantasy_Icons/Resources/Quest_100.png"
                alt=""
              />
            </span>
            <p className="capitalize select-none">name</p>
          </div>
        </div>
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
  );
}

export default CreateEffectForm;
