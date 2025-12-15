import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import NotificationPanel from "./NotificationPanel";

// Helper to decode JWT payload
const parseJwt = (token) => {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (e) {
    console.error("Failed to parse JWT:", e);
    return null;
  }
};

// Navbar for dashboard
function Navbar() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [username, setUsername] = useState("User"); // default
  const outletContext = useOutletContext() || {};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.sub) {
        setUsername(decoded.sub); // JWT typically stores username in 'sub'
      }
    }
  }, []);

  const headerContainerStyle = {
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: "40px",
    backgroundColor: "rgba(255,255,255,0.8)", 
    padding: "10px 20px", 
    borderRadius: "10px" ,
    marginTop:"20px",
  };

  const bellIconStyle = {
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#333",
    transition: "color 0.2s"
  };

  const handleNotificationToggle = () => {
    const newState = !notificationOpen;
    setNotificationOpen(newState);
    if (outletContext.setNotificationOpen) {
      outletContext.setNotificationOpen(newState);
    }
  };

  return(
    <>
      <div style={headerContainerStyle}>
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Hello {username}</span>
        <i 
          className="bi bi-bell" 
          style={bellIconStyle}
          onClick={handleNotificationToggle}
          title="Notifications"
        ></i>
      </div>
      
      <NotificationPanel 
        isOpen={notificationOpen} 
        onClose={() => {
          setNotificationOpen(false);
          if (outletContext.setNotificationOpen) {
            outletContext.setNotificationOpen(false);
          }
        }}
      />
    </>
  );
}

export default Navbar;
