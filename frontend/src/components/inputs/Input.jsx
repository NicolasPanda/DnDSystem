import React from "react";

const Input = React.forwardRef(function Input(
  {
    value,
    onChange,
    error = "",
    placeholder = "Name",
    title = false,
    number = false,
    className = "",
    ...rest
  },
  ref
) {
  return (
    <>
      <div className="flex flex-col">
        <div
          className={`w-full flex items-center justify-center relative px-3 py-2 leading-tight border rounded shadow border-stone-600 text-stone-100 bg-stone-700 focus:outline-none focus:shadow-outline ${className}`}
        >
          <input
            id={placeholder}
            {...rest}
            className="w-full px-2 py-1 mr-3 leading-tight placeholder-transparent bg-transparent border-none appearance-none peer text-stone-100 focus:outline-none"
            type={number ? "number" : "text"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref={ref}
          />{" "}
          <label
            htmlFor={placeholder}
            className="absolute text-xs transition-all -top-2.5 text-stone-300 left-1 peer-placeholder-shown:top-auto peer-placeholder-shown:left-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400"
          >
            {placeholder}
          </label>
        </div>
        <p className="text-xs italic text-red-500">{error}</p>
      </div>
    </>
  );
});

export default Input;
