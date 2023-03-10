import React from "react";

const Input = React.forwardRef(function Input(
  { value, onChange, error = "", placeholder = "Name", ...rest },
  ref
) {
  return (
    <>
      <input
        {...rest}
        type="text"
        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none border-stone-600 text-stone-100 bg-stone-700 focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
      />
      <p className="text-xs italic text-red-500">{error}</p>
    </>
  );
});

export default Input;
