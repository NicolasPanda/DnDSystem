import React, { useState } from "react";
import FileBrowser from "./FileBrowser";

const InputImage = React.forwardRef(function InputImage(
  {
    value,
    onChange = () => {},
    error = "",
    placeholder = "Name",
    className,
    ...rest
  },
  ref
) {
  const [fileBrowserOpen, setFileBrowserOpen] = useState(false);

  const selectFile = (file) => {
    onChange(file);
  };

  return (
    <>
      <div
        className="flex flex-col self-start cursor-pointer"
        onClick={() => setFileBrowserOpen(true)}
      >
        <div className="flex items-center">
          <p
            {...rest}
            className={`px-3 py-2 leading-tight rounded text-sm text-stone-300 ${className}`}
            ref={ref}
          >
            {placeholder}
          </p>
          {!value && <span className="w-16 h-16 aspect-square frame"></span>}
          {value && (
            <img
              className="object-cover w-16 h-16 aspect-square frame"
              src={`${
                process.env.REACT_APP_SERVER_URI
              }/files/${encodeURIComponent(value)}`}
              alt=""
            />
          )}
        </div>
        <p className="text-xs italic text-red-500">{error}</p>
      </div>
      <FileBrowser
        open={fileBrowserOpen}
        onClose={() => setFileBrowserOpen(false)}
        onSelect={(file) => selectFile(file)}
      />
    </>
  );
});

export default InputImage;
