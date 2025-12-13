import React from "react";

function DeleteTransaction({ transactionName, onClose, onDelete }) {

    const modalOverlay = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    };

    const modalBox = {
        background: "#fff",
        padding: "20px 25px 25px 25px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "350px",
        boxSizing: "border-box",
        textAlign: "left",
        fontFamily: "Arial, sans-serif",
        position: "relative",
    };

    const contentAreaStyle = {
        display: "flex",
        alignItems: "flex-start",
        gap: "15px",
        borderBottom: "1px solid #ddd",
        paddingBottom: "20px",
    };

    const titleStyle = {
        fontSize: "18px",
        fontWeight: "600",
        color: "#333",
        lineHeight: 1.2,
    };

    const messageStyle = {
        fontSize: "14px",
        color: "#666",
        marginTop: "5px",
    };

    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "20px",
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

    const outerCircleStyle = {
        padding: "14px",
        borderRadius: "50%",
        backgroundColor: "#FEF3F2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const iconWrapperStyle = {
        padding: "10px",
        borderRadius: "50%",
        backgroundColor: "#FFEBEE",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const deleteHandler = async () => {
    try {
        console.log("Deleting transaction:", transactionName);
        await onDelete();   // wait for backend
    } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete transaction");
    }
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
                        color: "#666"
                    }}
                >
                    &times;
                </button>

                {/* Main Content */}
                <div style={contentAreaStyle}>

                    {/* Trash Icon */}
                    <div style={outerCircleStyle}>
                        <div style={iconWrapperStyle}>
                            <svg width="24" height="24" viewBox="0 0 20 22" fill="none">
                                <path
                                    d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M8 10.5V15.5M12 10.5V15.5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5"
                                    stroke="#D92D20"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Text */}
                    <div>
                        <h2 style={titleStyle}>Delete Transaction?</h2>
                        <p style={messageStyle}>
                            Are you sure you want to delete this transaction?
                            This action cannot be undone.
                        </p>
                    </div>

                </div>

                {/* Buttons */}
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

export default DeleteTransaction;
