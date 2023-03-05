import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/Input";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      navigate("/role");
    }
  }, [navigate]);

  const onSubmit = (data) => {
    localStorage.setItem("name", data.name);
    navigate("/role");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen">
      <div className="flex flex-col items-center w-3/4 gap-4 p-4 rounded-md bg-stone-900">
        <h2 className="font-medium ">Enter your real Name</h2>
        <Input
          {...register("name", {
            required: "This field cannot be empty",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            maxLength: {
              value: 12,
              message: "Max. 12 characters for the name",
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Name must be only letters",
            },
          })}
          error={errors.name?.message}
        />
        <Button name="Connect" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
}

export default Login;
