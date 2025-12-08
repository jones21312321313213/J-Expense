import { useState } from "react";
import BudgetCard from "../Components/Budget/BudgetCard";
import EditBudget from "../Components/Budget/EditBudget";
import DeleteBudget from "../Components/Budget/DeleteBudget";

function BudgetDetails() {
  const [budgets, setBudgets] = useState([
    { budgetName: "Food Budget", amount: 3000, period: "yearly", dateRange: "Dec 1 - Dec 31", categories: "Food Category", beginning: "2024-12-01", until: "2024-12-31" },
    { budgetName: "Transportation Budget", amount: 1500, period: "month", dateRange: "Dec 1 - Dec 31", categories: "Commute Category", beginning: "2024-12-01", until: "2024-12-31" },
    { budgetName: "Entertainment Budget", amount: 500, period: "weekly", dateRange: "Dec 1 - Dec 7", categories: "Entertainment Category", beginning: "2024-12-01", until: "2024-12-07" },
    { budgetName: "Shopping Budget", amount: 2000, period: "monthly", dateRange: "Dec 1 - Dec 31", categories: "Shopping Category", beginning: "2024-12-01", until: "2024-12-31" },
    { budgetName: "Grocery Budget", amount: 800, period: "daily", dateRange: "Dec 1", categories: "Grocery Category", beginning: "2024-12-01", until: "2024-12-01" },
    { budgetName: "Miscellaneous Budget", amount: 1200, period: "monthly", dateRange: "Dec 1 - Dec 31", categories: "Miscellaneous Category", beginning: "2024-12-01", until: "2024-12-31" },
    { budgetName: "Weekend Food Budget", amount: 400, period: "weekly", dateRange: "Dec 1 - Dec 7", categories: "Food Category", beginning: "2024-12-01", until: "2024-12-07" },
    { budgetName: "Holiday Shopping", amount: 3500, period: "yearly", dateRange: "Dec 1 - Dec 31", categories: "Shopping Category", beginning: "2024-12-01", until: "2024-12-31" },
    { budgetName: "Movie Nights", amount: 300, period: "monthly", dateRange: "Dec 1 - Dec 31", categories: "Entertainment Category", beginning: "2024-12-01", until: "2024-12-31" },
    { budgetName: "Daily Commute", amount: 50, period: "daily", dateRange: "Dec 1", categories: "Commute Category", beginning: "2024-12-01", until: "2024-12-01" },
  ]);

  const [editingBudget, setEditingBudget] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, budgetName: "" });

  const handleCardClick = (budget) => {
    const cleanCategory = budget.categories.replace(/\s*category?$/i, "").trim();
    setEditingBudget({
      name: budget.budgetName,
      amountValue: budget.amount,
      frequency: 1,
      periodUnit: budget.period,
      beginning: budget.beginning,
      until: budget.until,
      category: cleanCategory,
    });
  };

  const handleCloseEdit = () => setEditingBudget(null);

  return (
    <div style={{ width: "100%", padding: "20px", boxSizing: "border-box" }}>
      {!editingBudget ? (
        <>
          <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px", textAlign: "center" }}>
            Budget Details
          </h1>

          <div
            style={{
              width: "100%",
              maxHeight: "calc(100vh - 150px)",
              overflowY: "auto",
              paddingRight: "8px",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE 10+
            }}
          >
            {/* Hide scrollbar for Chrome, Safari, Edge */}
            <style>
              {`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>

            {budgets.map((budget, idx) => (
              <BudgetCard
                key={idx}
                {...budget}
                onClick={() => handleCardClick(budget)}
                onDelete={() => setDeleteModal({ open: true, budgetName: budget.budgetName })}
              />
            ))}
          </div>

          {deleteModal.open && (
            <DeleteBudget
              name={deleteModal.budgetName}
              onClose={() => setDeleteModal({ open: false, budgetName: "" })}
              onDelete={() => {
                setBudgets(prev => prev.filter(b => b.budgetName !== deleteModal.budgetName));
                setDeleteModal({ open: false, budgetName: "" });
              }}
            />
          )}
        </>
      ) : (
        <EditBudget
          name={editingBudget.name}
          setName={(v) => setEditingBudget(prev => ({ ...prev, name: v }))}
          amountValue={editingBudget.amountValue}
          setAmountValue={(v) => setEditingBudget(prev => ({ ...prev, amountValue: v }))}
          onRequestSetAmount={() => {}}
          frequency={editingBudget.frequency}
          setFrequency={(v) => setEditingBudget(prev => ({ ...prev, frequency: v }))}
          periodUnit={editingBudget.periodUnit}
          setPeriodUnit={(v) => setEditingBudget(prev => ({ ...prev, periodUnit: v }))}
          beginning={editingBudget.beginning}
          setBeginning={(v) => setEditingBudget(prev => ({ ...prev, beginning: v }))}
          until={editingBudget.until}
          setUntil={(v) => setEditingBudget(prev => ({ ...prev, until: v }))}
          error={""}
          setError={() => {}}
          onBack={handleCloseEdit}
          initialCategory={editingBudget.category}
        />
      )}
    </div>
  );
}

export default BudgetDetails;
