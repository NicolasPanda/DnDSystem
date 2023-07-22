import React from "react";

const InputFile = React.forwardRef(function InputFile(
  { value, onChange, error = "", placeholder = "Name", className, ...rest },
  ref
) {
  return (
    <>
      <input
        {...rest}
        type="file"
        className={`w-full px-3 py-2 leading-tight border rounded shadow appearance-none border-stone-600 text-stone-100 bg-stone-700 focus:outline-none focus:shadow-outline ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
        multiple
      />
    </>
  );
});

export default InputFile;
