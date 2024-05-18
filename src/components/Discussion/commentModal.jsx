import React from "react";

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [comment, setComment] = React.useState("");

    const handleSubmit = () => {
        onSubmit(comment);
        setComment("");
        onClose();
    };

    return (
        <div className={`modal ${isOpen ? "show" : ""}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={handleSubmit}>Add Comment</button>
            </div>
        </div>
    );
};

export default Modal;
