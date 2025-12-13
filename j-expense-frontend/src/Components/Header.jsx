import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const baseButtonStyle = {
    borderRadius: "8px",
    border: "none",
    boxSizing: "border-box",
    color: "#FFFFFF",
    cursor: "pointer",
    display: "inline-block",
    fontFamily: `"Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif`,
    fontSize: "14px",
    fontWeight: 500,
    height: "40px",
    lineHeight: "20px",
    margin: "0 6px",
    outline: "none",
    padding: "10px 16px",
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 100ms",
    userSelect: "none",
  };

  return (
    <nav className="navbar navbar-expand-lg px-3">
      <span
        className="navbar-brand"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        J-Expense
      </span>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto d-flex align-items-center">

          <li className="nav-item">
            <button
              style={{ ...baseButtonStyle, backgroundColor: "#28a745" }}
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </li>

          <li className="nav-item">
            <button
              style={{ ...baseButtonStyle, backgroundColor: "#000000" }}
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Header;
