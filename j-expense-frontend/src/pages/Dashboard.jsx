import { useRef, useState, useEffect } from "react";
import Addcard from "../Components/Addcard";
import RecentTransaction from "../Components/RecentTransactions/RecentTransaction";
import Statistics from "../Components/Statistics";
import ExpensesBreakdown from "../Components/ExpensesBreakdown";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {

  const rowRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  return (
    <div style={{ width: "1624px" }}>
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
            <Addcard />
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
                to="/bills"
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
                to="/transactions"
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
              <ExpensesBreakdown />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
