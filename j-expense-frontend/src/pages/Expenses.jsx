import React, { useEffect, useState } from "react";
import WeeklyComparisonChart from "../Components/Expense/WeeklyComparisonChart";
import ExpenseBreakdownCard from "../Components/Expense/ExpenseBreakdownCard";
import { transactionService } from "../Components/Services/TransactionsService";

export default function Expenses() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    transactionService.getTransactionsByUser()
      .then(data => {
        // filter only expenses
        const expensesOnly = data.filter(tx => tx.type === "expense");
        setTransactions(expensesOnly);
      })
      .catch(err => console.error("Failed to fetch transactions:", err));
  }, []);

  const categories = ["Food", "Transportation", "Shopping", "Entertainment", "Grocery", "Miscellaneous"];

  return (
    <div>
      <h2>Expenses Comparison</h2>
      <WeeklyComparisonChart transactions={transactions} />

      <h2 style={{ marginTop: "40px" }}>Expenses Breakdown</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {categories.map((category) => (
          <ExpenseBreakdownCard key={category} category={category} transactions={transactions} />
        ))}
      </div>
    </div>
  );
}
