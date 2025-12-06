import pfp from "/src/assets/pfp.png";




function EditSettingsAccount({ onSave }) {
  const container = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: "30px",
    padding: "20px",
    width: "100%",
  };

  const leftSide = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "35px",
    padding: "20px",
    minHeight: "550px",
  };

  const inputStyle = {
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
  };

  const rightSide = {
    flex: 0.8,
    background: "#DEF3FB",
    padding: "40px",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "25px",
    minHeight: "550px",
    color: "white",
    fontWeight: "600",
    fontSize: "18px",
  };

const saveBtnStyle = {
    padding: "12px 30px",
    background: "#299D91",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    width: "25%", 
    borderRadius: "0", 
    marginBottom: "30px",
  };

  const cancelBtnStyle = {
    padding: "12px 30px",
    background: "#ccc",
    color: "#333",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    width: "25%", 
    borderRadius: "0", 
    marginBottom: "30px",
  };
  
const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "50px",
};


  // --- Handlers ---
  
  const handleSaveClick = () => {
    // 1. TODO **Perform API/State Update Logic here first** (e.g., save form data) 
    
    // 2. Call the prop function to switch back to view mode
    if (onSave) {
        onSave();
    }
  };

  const handleCancelClick = () => {
    // 1. No save logic needed, just switch back to view mode
    
    // 2. Call the prop function (onSave in this case acts as onCloseEdit/handleCancelEdit)
    if (onSave) {
        onSave();
    }
  };

  return (
      <div style={{ backgroundColor: "white", margin: "0", padding: "0" }}>

        <div style={container}>
          {/* LEFT SIDE (Input Fields) */}
          <div style={leftSide}>
            <div>
              <label>Username</label>
              <input style={inputStyle} type="text" placeholder="doejohn123" /> 
            </div>

            <div>
              <label>Full Name</label>
              <input style={inputStyle} type="text" placeholder="John DOe" />
            </div>

            <div>
              <label>Email</label>
              <input style={inputStyle} type="email" placeholder="johndoe@gmail.com" />
            </div>

          </div>

          {/* RIGHT SIDE (Profile Picture) */}
          <div style={rightSide}>
            <div style={{ color: "black", fontWeight: "bold", fontSize:"34px", marginBottom:"50px"}}>Profile Picture</div>
            {/* this is temp */}
              <img src={pfp} alt="Profile"  />
              <button style={{padding: "10px 20px", background: "#3A86FF", color: "white", border: "none", borderRadius: "8px", cursor: "pointer"}}>
                  Change Picture
              </button>
          </div>
        </div>

        {/* Buttons Container */}
        <div style={buttonContainer}>
          <button style={saveBtnStyle} onClick={handleSaveClick}>Save Changes</button>
          <button style={cancelBtnStyle} onClick={handleCancelClick}>Cancel</button>
         
        </div>

      </div>
  );
}

export default EditSettingsAccount;