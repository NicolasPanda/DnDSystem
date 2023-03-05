import React from "react";

const colors = {
  primary: "bg-[#3B82F6]",
  secondary: "bg-[#6B7280]",
  danger: "bg-red-500",
  success: "bg-green-500",
};

function IconButton({
  icon = "/icons/plus-solid.svg",
  onClick,
  disable,
  color = "primary",
  className,
  ...rest
}) {
  return (
    <button
      className={`flex items-center justify-center px-4 p-2 font-bold text-white rounded-md focus:outline-none focus:shadow-outline ${
        disable ? "bg-stone-600" : colors[color]
      }  ${className}`}
      type="button"
      onClick={disable ? null : onClick}
      {...rest}
    >
      <img className="w-8 h-8 aspect-square" src={icon} alt="" />
    </button>
  );
}

export default IconButton;
