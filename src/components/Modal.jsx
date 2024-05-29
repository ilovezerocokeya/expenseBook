import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onSave, initialText }) => {
  const [text, setText] = useState(initialText);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <input type="text" value={text} onChange={handleChange} />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  ) : null;
};

export default Modal;
