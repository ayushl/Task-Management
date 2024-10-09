import React from 'react';
import './Modal.css';
import { IoClose } from "react-icons/io5";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <IoClose className="close-btn" onClick={onClose} />
        {children}
      </div>
    </div>
  );
}

export default Modal;
