// navbar for dashboard
function Navbar() {
  const headerContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: "10px 20px",
    borderRadius: "10px",
    marginTop: "20px",
  };

  return (
    <div style={headerContainerStyle}>
      <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Hello User</span>
      {/* ✅ use className instead of class */}
      <i className="bi bi-bell"></i>
    </div>
  );
}

export default Navbar;
