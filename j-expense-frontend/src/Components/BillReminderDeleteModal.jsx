import React from "react";
import { FaTrash } from "react-icons/fa";

function BillReminderDeleteModal({ billName, onClose, onDelete }) {
    const modalOverlay = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    };

    const modalBox = {
        background: "#fff",
        padding: "25px 30px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "400px",
        boxSizing: "border-box",
        textAlign: "center",
        position: "relative",
        fontFamily: "Arial, sans-serif",
    };

    const titleStyle = {
        fontSize: "20px",
        fontWeight: "700",
        color: "#333",
        marginBottom: "10px",
    };

    const messageStyle = {
        fontSize: "14px",
        color: "#666",
        marginBottom: "20px",
    };

    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
    };

    const buttonStyle = {
        padding: "10px 18px",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        border: "1px solid #ccc",
        transition: "all 0.1s",
    };

    const deleteHandler = async () => {
        await onDelete();
        onClose();
    };

    return (
        <div style={modalOverlay}>
            <div style={modalBox}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "#666",
                    }}
                >
                    &times;
                </button>

                {/* Trash Icon */}
                <div
                    style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: "#FEF3F2",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto 15px auto",
                    }}
                >
                    <div
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "#FFEBEE",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <FaTrash color="#D92D20" size={20} />
                    </div>
                </div>

                <h2 style={titleStyle}>Delete Bill?</h2>
                <p style={messageStyle}>
                    Are you sure you want to delete <strong>{billName}</strong>? This action cannot be undone.
                </p>

                <div style={buttonContainerStyle}>
                    <button
                        style={{ ...buttonStyle, background: "#fff", color: "#333" }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        style={{ ...buttonStyle, background: "#E53935", color: "#fff", border: "none" }}
                        onClick={deleteHandler}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BillReminderDeleteModal;
