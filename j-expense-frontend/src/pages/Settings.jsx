import { useState } from "react";
import SettingsAccount from "../Components/settings/SettingsAccount";
import SettingsSecurity from "../Components/settings/SettingsSecurity";
import EditSettingsAccount from "../Components/settings/EditSettingsAccount";
// Import the new security edit component
import EditSettingsSecurity from "../Components/settings/EditSettingsSecurity"; // Assuming this path

function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  // 1. New State for Security Tab
  const [isEditingSecurity, setIsEditingSecurity] = useState(false); 

  // --- Account Handlers ---
  const handleEdit = () => {
    setIsEditingAccount(true);
  };

  const handleCancelEdit = () => {
    setIsEditingAccount(false);
  };
  
  // --- Security Handlers ---
  // 2. Function to switch to security edit mode
  const handleSecurityEdit = () => {
    setIsEditingSecurity(true);
  };

  // 3. Function to switch back to security view mode
  const handleSecurityCancel = () => {
    setIsEditingSecurity(false);
  };


  const activeStyle = {
    color: "#28a745",
    borderBottom: "2px solid #28a745",
    fontWeight: "600",
  };

  const linkStyle = {
    color: "#555",
    textDecoration: "none",
    marginRight: "15px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "0 auto",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Settings</h1>

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white "
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div
          className="collapse navbar-collapse show"
          id="settingsNavbar"
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div className="navbar-nav">
            <a
              href="#"
              className="nav-item nav-link"
              style={activeTab === "account" ? { ...linkStyle, ...activeStyle } : linkStyle}
              onClick={() => {
                setActiveTab("account");
                // Reset edit state for Account
                setIsEditingAccount(false); 
              }}
            >
              Account
            </a>

            <a
              href="#"
              className="nav-item nav-link"
              style={activeTab === "security" ? { ...linkStyle, ...activeStyle } : linkStyle}
              onClick={() => {
                setActiveTab("security");
                // Reset edit state for Security
                setIsEditingSecurity(false); 
              }}
            >
              Security
            </a>
          </div>
        </div>
      </nav>

      {/* BODY CONTENT */}
      <div
        style={{
          width: "100%",
          textAlign: "left",
        }}
      >
        {/* ACCOUNT TAB RENDERING */}
        {activeTab === "account" && 
          (
            isEditingAccount ? (
              <EditSettingsAccount onSave={handleCancelEdit} onCancel={handleCancelEdit} />
            ) : (
              <SettingsAccount onEditClick={handleEdit} />
            )
          )
        }
        
        {/* 4. SECURITY TAB RENDERING */}
        {activeTab === "security" && 
          (
            isEditingSecurity ? (
              // When in edit mode, render EditSettingsSecurity and pass the cancel/save function
              <EditSettingsSecurity onSave={handleSecurityCancel} onCancel={handleSecurityCancel} />
            ) : (
              // When in view mode, render SettingsSecurity and pass the edit function
              <SettingsSecurity onEditClick={handleSecurityEdit} />
            )
          )
        }
      </div>
    </div>
  );
}

export default Settings;