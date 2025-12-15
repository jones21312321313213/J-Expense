import React, { useEffect, useState } from "react";
import WeeklyComparisonChart from "../Components/Expense/WeeklyComparisonChart";
import ExpenseBreakdownCard from "../Components/Expense/ExpenseBreakdownCard";
import { transactionService } from "../Components/Services/TransactionsService";
import { getCategorySummary } from "../utils/expenseUtils";

export default function Expenses() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    transactionService.getTransactionsByUser()
      .then(data => {

        const expensesOnly = data.filter(
          tx => tx.type?.toLowerCase() === "expense"
        );
  
        console.log("RAW transactions sample:", data.slice(0, 5));
        console.log("Filtered expenses sample:", expensesOnly.slice(0, 5));
  
        const rawCategories = [...new Set(
          expensesOnly.map(tx => tx.category?.trim().toLowerCase())
        )].filter(Boolean);
        console.log("Fetched expense categories:", rawCategories);
  
        setTransactions(expensesOnly);
        setCategories(rawCategories);
      })
      .catch(err => console.error("Failed to fetch transactions:", err));
  }, []);
  
  return (
    <div>
      <h2>Expenses Comparison</h2>
      <WeeklyComparisonChart transactions={transactions} />

      <h2 style={{ marginTop: "40px" }}>Expenses Breakdown</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {categories.map((category) => {
          const { total } = getCategorySummary(category, transactions);
          return total > 0 ? (
            <ExpenseBreakdownCard
              key={category}
              category={category.charAt(0).toUpperCase() + category.slice(1)}
              transactions={transactions}
            />
          ) : null;
        })}
        {categories.every((c) => getCategorySummary(c, transactions).total === 0) && (
          <p style={{ color: "#6b7280", fontSize: "14px" }}>No expenses recorded yet</p>
        )}
      </div>
    </div>
  );
}
