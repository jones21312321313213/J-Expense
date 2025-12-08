// src/Components/Sidebar.jsx
function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{
        width: "280px",
        height: "100vh",
        position: "fixed",   // 👈 keeps it pinned
        top: 0,
        left: 0,
        zIndex: 1030,
      }}
    >
      {/* Brand */}
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4 fw-bold">J‑Expense</span>
      </a>
      <hr />

      {/* Navigation */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li><a className="nav-link text-white" href="/dashboard">Dashboard</a></li>
        <li><a className="nav-link text-white" href="/budgets">Budgets</a></li>
        <li><a className="nav-link text-white" href="/transactions">Transactions</a></li>
        <li><a className="nav-link text-white" href="/bills">Bills</a></li>
        <li><a className="nav-link text-white" href="/expenses">Expenses</a></li>
        <li><a className="nav-link text-white" href="/goals">Goals</a></li>
        <li><a className="nav-link text-white" href="/activity-log">Activity Log</a></li>
        <li><a className="nav-link text-white" href="/settings">Settings</a></li>
      </ul>

      <hr />

      {/* User profile */}
      <div className="d-flex align-items-center flex-column text-white">
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
            <a
              href="#"
              className="text-white text-decoration-none"
              style={{ fontSize: "0.85rem", opacity: 0.7 }}
            >
              View profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
