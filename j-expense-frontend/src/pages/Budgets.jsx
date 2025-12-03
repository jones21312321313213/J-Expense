import Add from "../Components/Add";
import { useState } from "react";
import SelectBudgetType from "../Components/Budget/SelectBudgetType";

function Budgets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateBudget = ({ type, amount }) => {
    const newBudget = { id: budgets.length + 1, name: `${type} - ${amount}` };
    setBudgets((b) => [...b, newBudget]);
    closeModal();
  };

  const containerStyle = {
    maxHeight: "800px",
    overflowY: "auto",
    padding: "10px",
    margin: "0 auto",
    maxWidth: "1500px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: budgets.length === 0 ? "1fr" : "repeat(2, 1fr)",
    gap: "20px",
  };

  const itemStyle = {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
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
      <h1 style={{ textAlign: "center" }}>Budgets</h1>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {budgets.map((budget) => (
            <div key={budget.id} style={itemStyle}>{budget.name}</div>
          ))}

          <div style={{ ...itemStyle, gridColumn: budgets.length === 0 ? "span 2" : "auto" }}>
            <Add onClick={openModal} />
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
