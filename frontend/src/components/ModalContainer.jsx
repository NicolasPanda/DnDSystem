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
    e.stopPropagation();
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`p-8 rounded-md bg-stone-800 text-stone-100 min-w-[600px] shrink-0 flex ${className} flex-col`}
        onClick={stopPropagation}
      >
        <h1 className="w-full text-2xl font-bold text-center uppercase">
          {title}
        </h1>
        <div className="flex w-full h-full pb-8 shrink-0">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default ModalContainer;
