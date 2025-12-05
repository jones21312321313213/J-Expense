import { useState } from "react";
import SettingsAccount from "../Components/settings/SettingsAccount";
import SettingsSecurity from "../Components/settings/SettingsSecurity";

function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  const activeStyle = {
    color: "#28a745",
    borderBottom: "2px solid #28a745",
    fontWeight: "600",
  };

  const linkStyle = {
    color: "#555",
    textDecoration: "none",
    paddingBottom: "5px",
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
        // ❌ remove alignItems: center (this was centering all children)
      }}
    >
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Settings</h1>

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light mb-3"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start", // align navbar left
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
              onClick={() => setActiveTab("account")}
            >
              Account
            </a>

            <a
              href="#"
              className="nav-item nav-link"
              style={activeTab === "security" ? { ...linkStyle, ...activeStyle } : linkStyle}
              onClick={() => setActiveTab("security")}
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
          textAlign: "left", // keep text left
        }}
      >
        {activeTab === "account" && <SettingsAccount />}
        {activeTab === "security" && <SettingsSecurity />}
      </div>
    </div>
  );
}

export default Settings;
