/**
 * RecentTransaction Component
 * ---------------------------
 * This component displays a tabbed view of recent transactions within the dashboard.
 * It allows users to switch between three tabs: "All", "Revenue", and "Expenses".
 *
 * State:
 * - `activeTab` (string): Keeps track of which tab is currently selected.
 *
 * Structure:
 * 1. Navbar:
 *    - Bootstrap-based navigation bar with three tabs.
 *    - Clicking a tab updates `activeTab` to switch the displayed content.
 * 2. Body:
 *    - Conditionally renders one of the following components based on `activeTab`:
 *      - RtAll: Shows all recent transactions.
 *      - RtRevenue: Shows only revenue transactions.
 *      - RtExpenses: Shows only expense transactions.
 *
 * Usage:
 * - Typically used inside a dashboard page to quickly view and filter recent financial activity.
 */

import { useState } from "react";
import RtAll from "./RtAll";
import RtRevenue from "./RtRevenue";
import RtExpenses from "./RtExpenses";

function RecentTransaction() {
  const [activeTab, setActiveTab] = useState("all"); // default tab

  return (
    <div style={{ maxWidth: "500px" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className={`nav-item nav-link ${activeTab === "all" ? "active" : ""}`}
              href="#"
              onClick={() => setActiveTab("all")}
            >
              All
            </a>
            <a
              className={`nav-item nav-link ${activeTab === "revenue" ? "active" : ""}`}
              href="#"
              onClick={() => setActiveTab("revenue")}
            >
              Revenue
            </a>
            <a
              className={`nav-item nav-link ${activeTab === "expenses" ? "active" : ""}`}
              href="#"
              onClick={() => setActiveTab("expenses")}
            >
              Expenses
            </a>
          </div>
        </div>
      </nav>

      {/* Body below navbar */}
      <div>
        {activeTab === "all" && <RtAll />}
        {activeTab === "revenue" && <RtRevenue />}
        {activeTab === "expenses" && <div><RtExpenses/></div>}
      </div>
    </div>
  );
}

export default RecentTransaction;
