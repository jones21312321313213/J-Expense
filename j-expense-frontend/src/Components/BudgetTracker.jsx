import React, { useEffect, useState } from 'react';
import { budgetService } from '../Components/Services/budgetService'; // update path if needed

function BudgetTracker() {
  const [expenseCount, setExpenseCount] = useState(0);
  const [savingsCount, setSavingsCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [budgets, setBudgets] = useState([]); // store fetched budgets

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await budgetService.getAllBudgets();
        console.log("Fetched budgets:", data); // debug: see all budgets

        setBudgets(data);

        // Count by first letter: 'S' = Savings, 'E' = Expense
        const expense = data.filter(b => b.type?.charAt(0).toUpperCase() === 'E').length;
        const savings = data.filter(b => b.type?.charAt(0).toUpperCase() === 'S').length;

        console.log({ expense, savings }); // debug: see counts

        setExpenseCount(expense);
        setSavingsCount(savings);
        setTotalCount(expense + savings);
      } catch (err) {
        console.error("Failed to fetch budgets:", err);
      }
    };

    fetchBudgets();
  }, []);

  // --- Styles (unchanged) ---
  const containerStyle = {
    padding: '0',
    minHeight: 'auto',
    marginTop: "20px",
    width: "500px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const trackerContainerStyle = {
    width: "500px",
    height: "auto",
    backgroundColor: "white",
    borderRadius: '18px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    padding: "30px",
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    fontSize: '1.8rem',
    fontWeight: '800',
    marginBottom: '25px',
    color: '#1a1a1a',
    textAlign: 'center',
    letterSpacing: '-0.5px',
  };

  const budgetRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '10px 0',
    borderBottom: '1px dashed #eee',
  };
  
  const budgetIconLabelStyle = {
      display: 'flex',
      alignItems: 'center',
  };

  const budgetIconStyle = (color) => ({
      fontSize: '1.2rem',
      marginRight: '10px',
      color: color,
  });

  const budgetLabelStyle = {
    fontSize: '1.1rem',
    color: '#444',
    fontWeight: '500',
  };

  const budgetValueStyle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#333',
    letterSpacing: '0.5px',
  };

  const totalBudgetWrapperStyle = {
    marginTop: '25px',
    padding: '15px 20px',
    backgroundColor: '#f8f8f8',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
  };

  const totalBudgetRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const totalLabelStyle = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
  };

  const totalValueStyle = {
    fontSize: '1.6rem',
    fontWeight: 'bolder',
    color: '#007bff',
  };

  return (
    <div style={containerStyle}>
      <div style={trackerContainerStyle}>
        

        {/* Expense Budget Row */}
        <div style={budgetRowStyle}>
            <div style={budgetIconLabelStyle}>
                <i className="bi bi-wallet-fill" style={budgetIconStyle('#ff6347')}></i>
                <div style={budgetLabelStyle}>Expense Budget Count:</div>
            </div>
            <div style={budgetValueStyle}>{expenseCount}</div>
        </div>
        
        {/* Savings/Income Budget Row */}
        <div style={budgetRowStyle}>
            <div style={budgetIconLabelStyle}>
                <i className="bi bi-piggy-bank-fill" style={budgetIconStyle('#3cb371')}></i>
                <div style={budgetLabelStyle}>Savings Budget Count:</div>
            </div>
            <div style={budgetValueStyle}>{savingsCount}</div>
        </div>
        
        {/* Total Budget */}
        <div style={totalBudgetWrapperStyle}>
            <div style={totalBudgetRowStyle}>
                <div style={totalLabelStyle}>TOTAL BUDGET COUNT:</div>
                <div style={totalValueStyle}>{totalCount}</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetTracker;
