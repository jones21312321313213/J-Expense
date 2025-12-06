function SettingsSecurity() {
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

  const buttonStyle = {
    padding: "12px 30px",
    background: "#299D91",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "0px",
    cursor: "pointer",
    minWidth: "150px",
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "400px",
    marginTop: "40px",
  };

  return (
    <div style={{ backgroundColor: "white", padding: "20px", minHeight: "550px" }}>
      {/* Inputs container */}
      <div style={container}>
        <div>
          <label>Password</label>
          <input
            style={inputStyle}
            type="password"
            placeholder="Enter password"
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

      {/* Buttons outside input container but inside white wrapper */}
      <div style={buttonContainer}>
        <button style={buttonStyle}>Change Password</button>
        <button style={buttonStyle}>Change Number</button>
      </div>
    </div>
  );
}

export default SettingsSecurity;
