import { useRef, useState, useEffect } from "react";
import Addcard from "../Components/Addcard";
import RecentTransaction from "../Components/RecentTransactions/RecentTransaction";
import Statistics from "../Components/Statistics";
import DashboardExpenseSummary from "../Components/Expense/DashboardExpenseSummary";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

import { transactionService } from "../Components/Services/TransactionsService";
import { useGoals } from "../context/GoalsContext";
import LatestGoalCard from "../Components/Goals/LatestGoalCard";

function Dashboard() {

  const rowRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    transactionService.getTransactionsByUser()
      .then(data => {
        const expensesOnly = data.filter(tx => tx.type?.toLowerCase() === "expense");
        console.log("Fetched expenses for Dashboard:", expensesOnly); // Debug log
        setTransactions(expensesOnly);
      })
      .catch(err => console.error("Failed to fetch transactions:", err));
  }, []);

  const bgStyle = {
    padding: "20px 20px",
    flex: 1,
    overflowX: "hidden",
  };

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "0 0 auto",
  };

  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "auto",
    whiteSpace: "nowrap",
    gap: "40px",
    paddingBottom: "10px",
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  const contentContainerStyle = {
    padding: "0 20px",
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  const { goals } = useGoals();
  const latestGoal = goals.length > 0 ? goals[goals.length - 1] : null;

  return (
    <div style={{ width: "100%" }}>
      <div style={bgStyle}>

        <Navbar />

        {/* Scrollable cards row */}
        <div
          style={{ ...rowStyle, ...contentContainerStyle }}
          ref={rowRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >

          {/* Budgets */}
          <div style={sectionStyle}>
            <h3 style={{ alignSelf: "flex-start" }}>Budgets</h3>
            <Addcard />
          </div>

          {/* Goals */}
          <div style={sectionStyle}>
            <h3 style={{ alignSelf: "flex-start" }}>Goals</h3>
            {latestGoal ? (
              <LatestGoalCard goal={latestGoal} />
            ) : (
              <div
                style={{
                  backgroundColor: "white",
                  marginTop: "20px",
                  borderRadius: "12px",
                  padding: "40px",
                  width: "500px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "280px",
                  fontSize: "1rem",
                  color: "#6b7280",
                }}
              >
                No goals added
              </div>
            )}
          </div>


          {/* Upcoming Bill */}
          <div style={sectionStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h3 style={{ margin: 0 }}>Upcoming Bill</h3>

              <Link
                to="/app/bills"
                style={{
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  color: "#6c757d",
                  whiteSpace: "nowrap",
                }}
              >
                View all &gt;
              </Link>
            </div>

            <Addcard />
          </div>

        </div>

        {/* Main Content Area */}
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>

          {/* Recent Transactions */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0 }}>Recent Transactions</h3>

              <Link
                to="/app/transactions"
                style={{
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  color: "#6c757d",
                  whiteSpace: "nowrap",
                }}
              >
                View all &gt;
              </Link>
            </div>

            <RecentTransaction />
          </div>

          {/* Statistics + Breakdown */}
          <div
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >

            <div>
              <h3 style={{ marginBottom: "10px" }}>Statistics</h3>
              <Statistics />
            </div>

            <div>
              <h3 style={{ marginBottom: "10px" }}>Expenses Breakdown</h3>
              <DashboardExpenseSummary transactions={transactions} />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
