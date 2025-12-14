function SettingsSecurity({ onEditClick }) {
  const container = {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    padding: "20px",
    maxWidth: "500px",
    margin: "0",
    minHeight: "550px",
  };

  const inputStyle = {
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
  };

  const updateBtn = {
    marginBottom: "30px",
    marginTop: "50px",
    padding: "12px",
    background: "#299D91",
    border:"none",
    color: "#fff",
    fontWeight: "600",
    width: "20%",
    cursor: "pointer",
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  };

  // Handler when user clicks Edit
  const handleEditClick = () => {
    if (onEditClick) {
        onEditClick(); // parent component can open a password change form
    }
  };

  return (
    <div style={{ backgroundColor: "white", padding: "20px", minHeight: "550px" }}>
      <div style={container}>
        <div>
          <label>Password</label>
          <input
            style={inputStyle}
            type="password"
            placeholder="********"  // <-- do NOT show actual password
            readOnly
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter phone number"
            readOnly
          />
        </div>
      </div>

      <div style={buttonContainer}>
        <button style={updateBtn} onClick={handleEditClick}>Change Password</button>
      </div>
    </div>
  );
}

export default SettingsSecurity;
