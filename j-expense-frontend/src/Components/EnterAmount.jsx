import { useState } from "react";


// Not yet finished since when it is 99999999999 it will go out of the container
function EnterAmount({ onSubmit, onClose }) {
  const [amount, setAmount] = useState("");

  const handleClick = (val) => {
    if (val === "x") {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount(amount + val);
    }
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };

  const modalStyle = {
    background: "#F1DEBD",
    padding: "30px",
    borderRadius: "20px",
    width: "380px",
    textAlign: "center",
  };

  const headerRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  };

  const titleStyle = {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold",
  };

  const priceStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    margin: "10px 0 20px 0", // moves P66 to its own row
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    marginBottom: "20px",
  };

  const keyStyle = {
    background: "#5DBB63",
    border: "none",
    borderRadius: "12px",
    padding: "20px 0",
    fontSize: "22px",
    color: "white",
    cursor: "pointer",
  };

  const submitStyle = {
    width: "100%",
    padding: "14px",
    background: "#299D91",
    border: "none",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "18px",
  };

  const keypad = ["7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "x"];

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Title and Close Row */}
        <div style={headerRowStyle}>
          <h2 style={titleStyle}>Enter amount</h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Price Row */}
        <h2 style={priceStyle}>₱{amount || "0"}</h2>

        {/* Keypad */}
        <div style={gridStyle}>
          {keypad.map((key) => (
            <button key={key} onClick={() => handleClick(key)} style={keyStyle}>
              {key}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button style={submitStyle} onClick={() => onSubmit && onSubmit(amount)}>
          Set amount
        </button>
      </div>
    </div>
  );
}

export default EnterAmount;
