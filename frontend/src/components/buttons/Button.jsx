import React from "react";

const colors = {
  primary: "bg-blue-500",
  secondary: "bg-[#6B7280]",
  danger: "bg-red-500",
  success: "bg-green-500",
};

function Button({
  name = "Button",
  onClick,
  disable,
  color = "primary",
  className,
  ...rest
}) {
  return (
    <button
      className={`px-8 py-2 font-bold text-white rounded-md focus:outline-none focus:shadow-outline ${
        disable ? "bg-stone-600" : colors[color]
      }  ${className}`}
      type="button"
      onClick={disable ? null : onClick}
      {...rest}
    >
      {name}
    </button>
  );
}

export default Button;
