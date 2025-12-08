// src/Components/Sidebar.jsx
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{
        width: "280px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1030,
      }}
    >
      {/* Brand */}
      <Link
        to="/dashboard"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4 fw-bold">J‑Expense</span>
      </Link>
      <hr />

      {/* Navigation */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li><Link className="nav-link text-white" to="/dashboard">Dashboard</Link></li>
        <li><Link className="nav-link text-white" to="/budgets">Budgets</Link></li>
        <li><Link className="nav-link text-white" to="/transactions">Transactions</Link></li>
        <li><Link className="nav-link text-white" to="/bills">Bills</Link></li>
        <li><Link className="nav-link text-white" to="/expenses">Expenses</Link></li>
        <li><Link className="nav-link text-white" to="/goals">Goals</Link></li>
        <li><Link className="nav-link text-white" to="/activity-log">Activity Log</Link></li>
        <li><Link className="nav-link text-white" to="/settings">Settings</Link></li>
      </ul>

      <hr />

      {/* User profile */}
      <div className="d-flex align-items-center w-100">
        <img
          src="https://github.com/mdo.png"
          alt="User"
          width="40"
          height="40"
          className="rounded-circle me-2"
        />
        <div className="d-flex flex-column">
          <strong style={{ fontSize: "1rem" }}>Random white dude</strong>
          <Link
            to="/profile"
            className="text-white text-decoration-none"
            style={{ fontSize: "0.85rem", opacity: 0.7 }}
          >
            View profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
