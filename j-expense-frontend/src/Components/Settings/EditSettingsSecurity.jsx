// Accept the onSave prop from the parent
function EditSettingsSecurity({ onSave }) { 
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
    width: "30%", 
    cursor: "pointer",
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
    gap: "20px", 
  };

  // Handler to simulate saving and switch back to view mode
  const handleSaveClick = () => {
    // TODO ADD THE SAVE LOGIC HERE
    console.log("Saving security settings..."); 
    if (onSave) {
        onSave(); 
    }
  };
  
  const handleCancelClick = () => {
    if (onSave) {
        onSave(); 
    }
  };

  return (
    <div style={{ backgroundColor: "white", padding: "20px", minHeight: "550px" }}>
      
      {/* Inputs container */}
      <div style={container}>
        
        {/* Old Password */}
        <div>
          <label>Old Password</label>
          <input
            style={inputStyle}
            type="password"
            placeholder="Enter old password"
          />
        </div>

        {/* New Password */}
        <div>
          <label>New Password</label>
          <input
            style={inputStyle}
            type="password"
            placeholder="Enter new password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label>Confirm Password</label>
          <input
            style={inputStyle}
            type="password"
            placeholder="Confirm new password"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label>Phone Number</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      {/* Buttons outside input container but inside white wrapper */}
      <div style={buttonContainer}>
        <button style={updateBtn} onClick={handleSaveClick}>Save Changes</button>
        <button style={{ ...updateBtn, background: "#ccc", color: "#333", width: "30%" }} onClick={handleCancelClick}>Cancel</button>
        
      </div>
    </div>
  );
}

export default EditSettingsSecurity;