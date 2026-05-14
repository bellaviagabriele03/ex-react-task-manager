import ReactDOM from "react-dom";
import { useRef, useState } from "react";

export default function EditTaskModal({ show, onClose, task, onSave, title, content, confirmText = "salva", onConfirm }) {
    if (!show) return null;




    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-box">
                <h2 className="modal-title">{title}</h2>
                <div className="modal-content">{content}</div>
                <div className="modal-actions">
                    <button className="modal-btn modal-btn-cancel" onClick={onClose}>Annulla</button>
                    <button className="modal-btn modal-btn-confirm" onClick={onSave}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    )
}