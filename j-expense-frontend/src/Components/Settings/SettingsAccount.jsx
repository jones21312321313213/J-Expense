import { useNavigate } from "react-router-dom";
import pfp from "/src/assets/pfp.png";


function SettingsAccount({ onEditClick }) {

  const navigate = useNavigate(); 
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

  const profilePic = {
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: "#eee",
    objectFit: "cover",
    border: "5px solid white",
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

const handleEditClick = () => {
    // Call the prop function provided by the parent (Settings)
    if (onEditClick) {
      onEditClick(); 
    }
  };

  return (
    <div style={{ backgroundColor: "white", margin: "0", padding: "0" }}>

      <div style={container}>
        {/* LEFT SIDE */}
        <div style={leftSide}>
          <div>
            <label>Username</label>
            <input style={inputStyle} type="text" placeholder="doejohn123" readOnly />
          </div>

          <div>
            <label>Full Name</label>
            <input style={inputStyle} type="text" placeholder="John DOe" readOnly/>
          </div>

          <div>
            <label>Email</label>
            <input style={inputStyle} type="email" placeholder="johndoe@gmail.com" readOnly/>
          </div>


        </div>

        {/* RIGHT SIDE */}
        <div style={rightSide}>
          <div style={{ color: "black", fontWeight: "bold", fontSize:"34px", marginBottom:"50px"}}>Profile Picture</div>
            <img  src={pfp} alt="Profile" />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* The onClick now uses the new handler */}
        <button style={updateBtn} onClick={handleEditClick}>Edit</button>
      </div>

    </div>
  );
}

export default SettingsAccount;
