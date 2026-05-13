import ReactDOM from "react-dom";

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-box">
                <h2 className="modal-title">{title}</h2>
                <div className="modal-content">{content}</div>
                <div className="modal-actions">
                    <button className="modal-btn modal-btn-cancel" onClick={onClose}>Annulla</button>
                    <button className="modal-btn modal-btn-confirm" onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    );
}
