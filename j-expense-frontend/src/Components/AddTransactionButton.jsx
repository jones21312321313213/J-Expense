/**
 * AddTransactionButton Component
 * -------------------------------
 * This component renders a floating "plus" button on the dashboard, typically used
 * to add a new transaction. It is positioned fixed at the bottom-right corner of the screen.
 *
 * Features:
 * - Floating and always visible, overlaying other content.
 * - Enlarges slightly on hover for visual feedback.
 * - On click, navigates the user to the "/transactions" page using React Router's `useNavigate`.
 *
 * Props / State:
 * - `hover` (boolean): Tracks whether the mouse is hovering over the button to apply a scale effect.
 *
 * Styling:
 * - Circular-ish button with a bold "+" icon.
 * - Shadow and border to make it stand out from the background.
 *
 * Usage:
 * - Used in dashboards or pages where quick access to add new transactions is needed.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTransactionButton() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    navigate("/transactions");
  };

  const buttonStyle = {
    position: "fixed",       // Floating button
    bottom: "4rem",
    right: "2rem",
    width: "6rem",
    height: "6rem",
    backgroundColor: "white",
    border: "4px solid black",
    borderRadius: "30%",     
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",        // Plus size
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    zIndex: 9999,            // Overlay everything
    transform: hover ? "scale(1.1)" : "scale(1)",  // Hover scale
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Add new transaction"
    >
      +
    </button>
  );
}

export default AddTransactionButton;
