import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Services/UserService"; // import your service
import pfp from "/src/assets/pfp.png";

function SettingsAccount({ onEditClick }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ username: "", email: "", profilePicURL: "" });

  useEffect(() => {
    UserService.getLoggedInUser()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error(err));
  }, []);


  const handleEditClick = () => {
    if (onEditClick) onEditClick();
  };

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



  const updateBtn = {
    marginBottom: "30px",
    marginTop: "50px",
    padding: "12px",
    background: "#299D91",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    width: "20%",
    cursor: "pointer",
  };

  return (
    <div style={{ backgroundColor: "white", margin: 0, padding: 0 }}>
      <div style={container}>
        {/* LEFT SIDE */}
        <div style={leftSide}>
          <div>
            <label>Username</label>
            <input style={inputStyle} type="text" value={currentUser.username} readOnly />
          </div>

          <div>
            <label>Email</label>
            <input style={inputStyle} type="email" value={currentUser.email} readOnly />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={rightSide}>
          <div
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "34px",
              marginBottom: "50px",
            }}
          >
            Profile Picture
          </div>
          <img
            src={currentUser.profilePicURL || pfp}
            alt="Profile"
          
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button style={updateBtn} onClick={handleEditClick}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default SettingsAccount;
