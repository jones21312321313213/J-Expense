import Add from "../Components/Add";
import { useState } from "react";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
import SelectBudgetType from "../Components/Budget/SelectBudgetType";

function Budgets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateBudget = ({ type, category, amount, name, frequency = 1, beginning, periodUnit = "Month" }) => {
    const today = new Date();

    // Helper: parse beginning like 'Dec 4' into a Date in the current year. If parsing fails, default to today.
    const parseBeginning = (b) => {
      if (!b || typeof b !== 'string') return new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const parts = b.trim().split(/\s+/);
      if (parts.length >= 2) {
        const mon = parts[0];
        const day = parseInt(parts[1], 10);
        // match by first 3 letters (abbr) or full month name
        const mIdx = monthNames.findIndex(x => x.slice(0,3).toLowerCase() === mon.toLowerCase().slice(0,3) || x.toLowerCase() === mon.toLowerCase());
        if (mIdx !== -1 && !isNaN(day)) {
          return new Date(today.getFullYear(), mIdx, day);
        }
      }
      // fallback try Date parse
      const parsed = new Date(b);
      if (!isNaN(parsed)) return parsed;
      return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    };

    const startDate = parseBeginning(beginning);

    // Compute endDate based on periodUnit and frequency. End date is inclusive (last day covered by budget).
    let endDate = new Date(startDate.getTime());
    let unit = (periodUnit).toString().toLowerCase();
    // Normalize variants like 'daily', 'weekly', 'monthly', 'yearly' to canonical units
    if (unit.indexOf('day') !== -1) unit = 'day';
    else if (unit.indexOf('week') !== -1) unit = 'week';
    else if (unit.indexOf('month') !== -1) unit = 'month';
    else if (unit.indexOf('year') !== -1) unit = 'year';

    if (unit === 'day') {
      // End is start + frequency days
      endDate.setDate(endDate.getDate() + Math.max(1, frequency));
    } else if (unit === 'week') {
      // End is start + frequency * 7 days
      endDate.setDate(endDate.getDate() + (Math.max(1, frequency) * 7));
    } else if (unit === 'month') {
      // End is start + frequency months
      endDate.setMonth(endDate.getMonth() + Math.max(1, frequency));
    } else if (unit === 'year') {
      // End is start + frequency years
      endDate.setFullYear(endDate.getFullYear() + Math.max(1, frequency));
    } else {
      // default to one month
      endDate.setMonth(endDate.getMonth() + 1);
    }

    // Format strings for display
    const startDateStr = `${monthNames[startDate.getMonth()]} ${startDate.getDate()}, ${startDate.getFullYear()}`;
    const endDateStr = `${monthNames[endDate.getMonth()]} ${endDate.getDate()}, ${endDate.getFullYear()}`;

    // Compute progress percent based on time elapsed between start and end
    let progressPercentage = 0;
    if (today <= startDate) {
      progressPercentage = 0;
    } else if (today >= endDate) {
      progressPercentage = 100;
    } else {
      const total = endDate.getTime() - startDate.getTime();
      const passed = today.getTime() - startDate.getTime();
      progressPercentage = total > 0 ? Math.round((passed / total) * 100) : 0;
    }

    const dayProgress = Math.min(100, Math.max(0, progressPercentage));

    const newBudget = {
      id: budgets.length + 1,
      name: name || category || type,
      type,
      category,
      amount: amount || 0,
      periodUnit,
      currentAmount: Math.floor(Math.random() * (amount || 1000)),
      startDate: startDateStr,
      endDate: endDateStr,
      startDateISO: startDate.toISOString(),
      endDateISO: endDate.toISOString(),
      dayProgress,
      progressPercentage,
      frequency,
      beginning
    };
    setBudgets((b) => [...b, newBudget]);
    closeModal();
  };

  const containerStyle = {
    padding: "40px 20px",
    margin: "0 auto",
    maxWidth: "1500px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: budgets.length === 0 ? "1fr" : "repeat(2, 1fr)",
    gap: "30px",
    marginBottom: "20px"
  };

  const cardStyle = {
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff"
  };

  const cardHeaderStyle = {
    background: "linear-gradient(to right, #a8d8ea 0%, #f5e6d3 100%)",
    padding: "30px 40px"
  };

  const cardProgressStyle = {
    background: "#d4d4d4",
    padding: "50px 40px"
  };

  const addButtonContainerStyle = {
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    height: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    backgroundColor: "#fff",
    cursor: "pointer"
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", paddingTop: "20px" }}>Budgets</h1>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {budgets.map((budget) => (
            <div key={budget.id} style={cardStyle}>
              {/* Header Section */}
              <div style={cardHeaderStyle}>
                <h2 style={{
                  margin: "0 0 10px 0",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#000"
                }}>
                  {budget.name}
                </h2>
                <p style={{
                  margin: 0,
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: "#000"
                }}>
                  P {budget.currentAmount.toLocaleString()} <span style={{ fontWeight: "normal" }}>left of P {budget.amount.toLocaleString()}</span>
                </p>
              </div>

              {/* Progress Section */}
              <div style={cardProgressStyle}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px"
                }}>
                  {/* Start Date: top = Month Day, bottom = Year */}
                  <div style={{
                    textAlign: "center",
                    minWidth: "80px"
                  }}>
                    <div style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "#000"
                    }}>
                      {(() => { const d = new Date(budget.startDateISO); return `${monthNames[d.getMonth()]} ${d.getDate()}`; })()}
                    </div>
                    <div style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#000"
                    }}>
                      {(() => { const d = new Date(budget.startDateISO); return `${d.getFullYear()}`; })()}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    flex: 1,
                    position: "relative"
                  }}>
                    {/* Today Label */}
                    <div style={{
                      position: "absolute",
                      top: "-35px",
                      left: `${budget.dayProgress}%`,
                      transform: "translateX(-50%)",
                      background: "#fff",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                      border: "1px solid #ddd",
                      zIndex: 4
                    }}>
                      Today
                    </div>

                    {/* Progress Bar Container */}
                    <div style={{
                      background: "#5a5a5a",
                      height: "40px",
                      borderRadius: "20px",
                      position: "relative",
                      overflow: "hidden"
                    }}>
                      {/* Progress Fill */}
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: `${budget.progressPercentage}%`,
                        background: "#5a5a5a",
                        transition: "width 0.3s ease",
                        zIndex: 1
                      }}></div>

                      {/* Thin white 'Today' indicator line positioned under the Today badge */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: `${budget.dayProgress}%`,
                        transform: 'translateX(-50%)',
                        width: '2px',
                        height: '100%',
                        background: '#fff',
                        opacity: 0.95,
                        zIndex: 2
                      }} />

                      {/* Percentage Text */}
                      <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        fontSize: "0.9rem",
                        fontWeight: "bold"
                      }}>
                        {budget.progressPercentage}%
                      </div>
                    </div>
                  </div>

                  {/* End Date: top = Month Day, bottom = Year */}
                  <div style={{
                    textAlign: "center",
                    minWidth: "80px"
                  }}>
                    <div style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "#000"
                    }}>
                      {(() => { const d = new Date(budget.endDateISO); return `${monthNames[d.getMonth()]} ${d.getDate()}`; })()}
                    </div>
                    <div style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#000"
                    }}>
                      {(() => { const d = new Date(budget.endDateISO); return `${d.getFullYear()}`; })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Button */}
          <div style={addButtonContainerStyle} onClick={openModal}>
            <Add />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <SelectBudgetType onClose={closeModal} onCreateBudget={handleCreateBudget} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Budgets;
