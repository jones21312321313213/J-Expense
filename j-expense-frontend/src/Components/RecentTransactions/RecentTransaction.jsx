/**
 * RecentTransaction Component
 * ---------------------------
 * Displays a tabbed view of recent transactions within the dashboard.
 * Tabs: "All", "Revenue", "Expenses".
 * Pulls live data from TransactionsContext and passes it to child components.
 */

import { useState } from "react";
import { useTransactions } from "../../context/TransactionsContext";
import RtAll from "./RtAll";
import RtRevenue from "./RtRevenue";
import RtExpenses from "./RtExpenses";

function RecentTransaction() {
  const [activeTab, setActiveTab] = useState("all"); // default tab
  const { transactions = [] } = useTransactions(); // ✅ safe default

  // Filtered datasets
  const revenueTx = transactions.filter((tx) => tx.type === "Income");
  const expenseTx = transactions.filter((tx) => tx.type === "Expense");

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
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("all");
              }}
            >
              All
            </a>
            <a
              className={`nav-item nav-link ${activeTab === "revenue" ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("revenue");
              }}
            >
              Revenue
            </a>
            <a
              className={`nav-item nav-link ${activeTab === "expenses" ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("expenses");
              }}
            >
              Expenses
            </a>
          </div>
        </div>
      </nav>

      {/* Body below navbar */}
      <div>
        {activeTab === "all" && <RtAll transactions={transactions} />}
        {activeTab === "revenue" && <RtRevenue transactions={revenueTx} />}
        {activeTab === "expenses" && <RtExpenses transactions={expenseTx} />}
      </div>
    </div>
  );
}

export default RecentTransaction;
