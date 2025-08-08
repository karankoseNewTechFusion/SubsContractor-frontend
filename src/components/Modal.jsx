
import React from "react";
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-black text-lg"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
