import { useState, useEffect } from "react";
import BudgetCard from "../Components/Budget/BudgetCard";
import EditBudget from "../Components/Budget/EditBudget";
import DeleteBudget from "../Components/Budget/DeleteBudget";
import { budgetService } from "../Components/Services/budgetService";

function BudgetDetails() {
  const [budgets, setBudgets] = useState([]);

  const [editingBudget, setEditingBudget] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, budgetId: null, budgetName: "" });

  const handleCardClick = (budget) => {
    const cleanCategory = (budget.categories || '').toString().replace(/\s*category?$/i, "").trim();
    setEditingBudget({
      id: budget.id,
      type: budget.type || '',
      name: budget.budgetName || '',
      amountValue: budget.amount || 0,
      frequency: budget.frequency || 1,
      periodUnit: budget.period || 'Month',
      beginning: budget.beginning,
      until: budget.until,
      category: cleanCategory,
    });
  };

  // load current user's budgets on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await budgetService.getAllBudgets();
        if (!mounted) return;
        const cards = list.map(formatBackendBudget);
        setBudgets(cards);
      } catch (err) {
        console.error('Error loading budgets:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // format backend budget object into shape expected by BudgetCard
  const formatBackendBudget = (b) => {
    // b: { id, type, name, category, amount, period, beginning, frequency }
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const today = new Date();

    const periodRaw = b.period || '';
    let frequency = b.frequency || 1;
    let periodUnit = 'Month';
    if (periodRaw) {
      const parts = periodRaw.toString().trim().split(/\s+/);
      if (parts.length >= 2) {
        frequency = parseInt(parts[0], 10) || frequency;
        periodUnit = parts[1];
      }
    }

    const parseBeginning = (val) => {
      if (!val) return new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (/^\d{4}-\d{2}-\d{2}/.test(val)) {
        const [y,m,d] = val.split('-').map(x => parseInt(x,10));
        return new Date(Date.UTC(y, m-1, d));
      }
      const iso = new Date(val);
      if (!isNaN(iso)) return iso;
      return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    };

    const start = parseBeginning(b.beginning);
    let end = new Date(start.getTime());
    const unit = (periodUnit || 'month').toString().toLowerCase();
    if (unit.indexOf('day') !== -1) end.setDate(end.getDate() + Math.max(1, frequency));
    else if (unit.indexOf('week') !== -1) end.setDate(end.getDate() + Math.max(1, frequency) * 7);
    else if (unit.indexOf('month') !== -1) end.setMonth(end.getMonth() + Math.max(1, frequency));
    else if (unit.indexOf('year') !== -1) end.setFullYear(end.getFullYear() + Math.max(1, frequency));
    else end.setMonth(end.getMonth() + 1);

    const formatShort = (d) => `${monthNames[d.getMonth()]} ${d.getDate()}`;

    return {
      id: b.id,
      type: b.type || '',
      budgetName: b.name || b.type || 'Budget',
      amount: b.amount || b.total_amount || 0,
      period: periodUnit,
      dateRange: `${formatShort(start)} - ${formatShort(end)}`,
      categories: b.category || b.category_name || 'Uncategorized',
      beginning: b.beginning,
      until: end.toISOString().split('T')[0],
      frequency: b.frequency || frequency
    };
  };

  const handleCloseEdit = () => setEditingBudget(null);

  // Save edits from EditBudget
  const handleSaveChanges = async (vals) => {
    if (!editingBudget || !editingBudget.id) return;
    try {
      const payload = {
        type: editingBudget.type || null,
        name: vals.name,
        category_name: vals.category,
        total_amount: parseFloat(vals.amountValue) || 0,
        period: `${vals.frequency} ${vals.periodUnit}`,
        beginning: vals.beginning ? (new Date(vals.beginning).toISOString().split('T')[0]) : null,
        frequency: parseInt(vals.frequency, 10) || 1
      };
      const updated = await budgetService.updateBudget(editingBudget.id, payload);
      // updated is expected to be the mapped budget object
      const updatedCard = formatBackendBudget(updated);
      setBudgets(prev => prev.map(b => b.id === editingBudget.id ? updatedCard : b));
      setEditingBudget(null);
    } catch (err) {
      console.error('Failed to save changes:', err);
      alert('Failed to save changes. Please try again.');
    }
  };

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

            {budgets.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>No budgets yet.</div>
            ) : (
              budgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  {...budget}
                  onClick={() => handleCardClick(budget)}
                  onDelete={() => setDeleteModal({ open: true, budgetId: budget.id, budgetName: budget.budgetName })}
                />
              ))
            )}
          </div>

          {deleteModal.open && (
            <DeleteBudget
              name={deleteModal.budgetName}
              onClose={() => setDeleteModal({ open: false, budgetId: null, budgetName: "" })}
              onDelete={async () => {
                try {
                  if (deleteModal.budgetId) await budgetService.deleteBudget(deleteModal.budgetId);
                  setBudgets(prev => prev.filter(b => b.id !== deleteModal.budgetId));
                } catch (err) {
                  console.error('Failed to delete budget:', err);
                  alert('Failed to delete budget. Please try again.');
                } finally {
                  setDeleteModal({ open: false, budgetId: null, budgetName: "" });
                }
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
          onRequestSetAmount={handleSaveChanges}
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
