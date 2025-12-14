import React, { useEffect, useState } from "react";
import pfp from "/src/assets/pfp.png";
import UserService from "../Services/UserService"; // Make sure your service path is correct

function EditSettingsAccount({ onSave }) {
  const [user, setUser] = useState({
    userID: "",
    username: "",
    fullName: "",
    email: "",
    profilePicURL: "",
  });

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

  // --- Fetch logged-in user info ---
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await UserService.getLoggedInUser();
        setUser({
          userID: data.userID,
          username: data.username,
          fullName: data.fullName || "",
          email: data.email,
          profilePicURL: data.profilePicURL || "",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, []);

  // --- Handlers ---
  const handleSaveClick = async () => {
    try {
      const updatedUser = await UserService.updateUser(user.userID, user);

      // Update local state immediately
      setUser(updatedUser);

      if (onSave) onSave(); // return to view mode
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };


  const handleCancelClick = () => {
    if (onSave) onSave();
  };

  return (
    <div style={{ backgroundColor: "white", margin: "0", padding: "0" }}>
      <div style={container}>
        {/* LEFT SIDE (Input Fields) */}
        <div style={leftSide}>
          <div>
            <label>Username</label>
            <input
              style={inputStyle}
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <div>
            <label>Full Name</label>
            <input
              style={inputStyle}
              type="text"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              style={inputStyle}
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        </div>

        {/* RIGHT SIDE (Profile Picture) */}
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
            src={user.profilePicURL || pfp}
            alt="Profile"
            style={{ width: "220px", height: "220px", borderRadius: "50%" }}
          />
          <button
            style={{
              padding: "10px 20px",
              background: "#3A86FF",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => alert("Profile pic change functionality not implemented yet")}
          >
            Change Picture
          </button>
        </div>
      </div>

      {/* Buttons Container */}
      <div style={buttonContainer}>
        <button style={saveBtnStyle} onClick={handleSaveClick}>
          Save Changes
        </button>
        <button style={cancelBtnStyle} onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditSettingsAccount;
