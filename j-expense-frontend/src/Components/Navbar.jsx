import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import NotificationPanel from "./NotificationPanel";

// navbar for dashboard
function Navbar(){
    const [notificationOpen, setNotificationOpen] = useState(false);
    const outletContext = useOutletContext() || {};
    
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
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Hello User</span>
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

export default Navbar