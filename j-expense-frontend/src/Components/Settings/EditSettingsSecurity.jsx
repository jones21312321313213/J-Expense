import { useState } from "react";
import UserService from "../Services/UserService";

function EditSettingsSecurity({ onSave }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const container = {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    padding: "20px",
    maxWidth: "500px",
    minHeight: "550px",
  };

  const inputStyle = {
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
  };

  const buttonStyle = {
    padding: "12px",
    background: "#299D91",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    width: "30%",
    cursor: "pointer",
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "40px",
  };

  /* =========================
     SAVE PASSWORD
  ========================= */
  const handleSaveClick = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await UserService.changePassword({
        oldPassword,
        newPassword,
        phone,
      });

      alert("Password updated successfully");
      onSave(); // return to view mode
    } catch (err) {
      alert(err.message || "Failed to update password");
    }
  };

  return (
    <div style={{ backgroundColor: "white", padding: "20px" }}>
      <div style={container}>
        <div>
          <label>Old Password</label>
          <input
            style={inputStyle}
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div>
          <label>New Password</label>
          <input
            style={inputStyle}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            style={inputStyle}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            style={inputStyle}
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div style={buttonContainer}>
        <button style={buttonStyle} onClick={handleSaveClick}>
          Save Changes
        </button>
        <button
          style={{ ...buttonStyle, background: "#ccc", color: "#333" }}
          onClick={onSave}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditSettingsSecurity;
