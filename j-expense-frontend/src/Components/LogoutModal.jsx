import React from "react";
import { useNavigate } from "react-router-dom";
import { useGoals } from "../context/GoalsContext";
function LogoutModal({ onClose }) {
  const navigate = useNavigate();

  /* ===== Styles (same structure as DeleteTransaction) ===== */

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
  };

  const outerCircleStyle = {
    padding: "14px",
    borderRadius: "50%",
    backgroundColor: "#FFFBEB", // warning background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const iconWrapperStyle = {
    padding: "10px",
    borderRadius: "50%",
    backgroundColor: "#FEF3C7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  /* ===== Logout Logic ===== */

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // if you stored it
    const { clearGoals } = useGoals();
    clearGoals();
    navigate("/login");
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

        {/* Main Content */}
        <div style={contentAreaStyle}>

          {/* Warning Icon */}
          <div style={outerCircleStyle}>
            <div style={iconWrapperStyle}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9V13"
                  stroke="#D97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 17H12.01"
                  stroke="#D97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M10.29 3.86L1.82 18.14C1.47 18.74 1.30 19.04 1.33 19.28C1.36 19.49 1.47 19.68 1.64 19.82C1.84 20 2.19 20 2.88 20H21.12C21.81 20 22.16 20 22.36 19.82C22.53 19.68 22.64 19.49 22.67 19.28C22.70 19.04 22.53 18.74 22.18 18.14L13.71 3.86C13.37 3.28 13.20 2.99 12.98 2.89C12.79 2.80 12.58 2.80 12.39 2.89C12.17 2.99 12.00 3.28 11.66 3.86Z"
                  stroke="#D97706"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 style={titleStyle}>Log out?</h2>
            <p style={messageStyle}>
              Are you sure you want to log out of your account?
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
            style={{
              ...buttonStyle,
              background: "#F59E0B",
              color: "#fff",
              border: "none",
            }}
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default LogoutModal;
