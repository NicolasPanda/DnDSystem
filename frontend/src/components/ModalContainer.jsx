import React from "react";
import ReactDOM from "react-dom";

function ModalContainer({ open, onClose, children }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      {children}
    </div>,
    document.getElementById("modal-root")
  );
}

export default ModalContainer;
