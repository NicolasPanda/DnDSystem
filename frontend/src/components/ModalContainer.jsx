import React from "react";
import ReactDOM from "react-dom";

function ModalContainer({
  open,
  onClose,
  title = "Missing Title here",
  children,
  className = "",
}) {
  const stopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`p-8 rounded-md bg-stone-800 text-stone-100 min-w-[600px] flex items-center flex-col ${className}`}
        onClick={stopPropagation}
      >
        <h1 className="mb-4 text-2xl font-bold uppercase">{title}</h1>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default ModalContainer;
