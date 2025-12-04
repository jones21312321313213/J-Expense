import AllTransactions from "../Components/Transactions/AllTransactions";
import ExpensesTransactions from "../Components/Transactions/ExpensesTransactions";
import IncomeTransactions from "../Components/Transactions/IncomeTransactions";
import { useState } from "react";

function Transactions() {
  const [activeTab, setActiveTab] = useState("all");

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <AllTransactions />;
      case "income":
        return <IncomeTransactions />;
      case "expenses":
        return <ExpensesTransactions />;
      default:
        return <AllTransactions />;
    }
  };

  // Responsive container style
  const containerStyle = {
    width: "100%",
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",

    // Responsive height: almost full viewport height
    minHeight: "70vh",      // on small screens
    maxHeight: "90vh",      // on large screens
    height: "calc(96vh - 100px)", // adjust automatically based on viewport
    overflow: "hidden",
  };

  // Scrollable content
  const contentStyle = {
    flex: 1,
    overflowY: "auto",
    paddingTop: "10px",
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Title */}
      <h2 style={{ textAlign: "center" }}>Transactions</h2>

      {/* Responsive container */}
      <div style={containerStyle}>
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg navbar-light mb-3"
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "10px",
          }}
        >
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#transactionsNavAltMarkup"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="transactionsNavAltMarkup">
            <div className="navbar-nav">
              {/* ALL */}
              <a
                className="nav-item nav-link"
                href="#"
                style={{
                  color: activeTab === "all" ? "green" : "black",
                  textDecoration: activeTab === "all" ? "underline" : "none",
                  fontWeight: activeTab === "all" ? "600" : "400",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("all");
                }}
              >
                All
              </a>

              {/* INCOME */}
              <a
                className="nav-item nav-link"
                href="#"
                style={{
                  color: activeTab === "income" ? "green" : "black",
                  textDecoration: activeTab === "income" ? "underline" : "none",
                  fontWeight: activeTab === "income" ? "600" : "400",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("income");
                }}
              >
                Income
              </a>

              {/* EXPENSES */}
              <a
                className="nav-item nav-link"
                href="#"
                style={{
                  color: activeTab === "expenses" ? "green" : "black",
                  textDecoration: activeTab === "expenses" ? "underline" : "none",
                  fontWeight: activeTab === "expenses" ? "600" : "400",
                }}
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

        {/* Scrollable content */}
        <div style={contentStyle}>{renderContent()}</div>
      </div>
    </div>
  );
}

export default Transactions;
