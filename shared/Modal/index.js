import React from 'react';
import "./Modal.styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ onClose, title, children }) => {
  return (
    <div className="modal-background">
      <div className="modal">
        <div className="modal-title vga">
          <h4>{title}</h4>
          <button className="blend" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
