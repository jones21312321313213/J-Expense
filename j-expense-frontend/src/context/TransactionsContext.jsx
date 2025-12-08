import { createContext, useContext, useState } from "react";

const TransactionsContext = createContext();

export const useTransactions = () => useContext(TransactionsContext);

const normalizeTransaction = (tx) => {
  const toNumber = (val) => {
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const cleaned = val.replace(/[^\d.]/g, "");
      return cleaned ? parseFloat(cleaned) : 0;
    }
    return 0;
  };

  const type =
    tx.type?.toLowerCase() === "income"
      ? "Income"
      : tx.type?.toLowerCase() === "expense"
      ? "Expense"
      : "Expense";

  const category = tx.category?.trim() || "Miscellaneous";
  const date = tx.date || new Date().toISOString().slice(0, 10);

  return {
    type,
    category,
    name: tx.name?.trim() || "Untitled",
    vendor: tx.vendor?.trim() || "",
    amount: toNumber(tx.amount),
    date,
    ...(tx.frequency ? { frequency: tx.frequency } : {}),
    ...(tx.periodUnit ? { periodUnit: tx.periodUnit } : {}),
  };
};

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    { type: "Expense", category: "Food", name: "Jollibee", vendor: "Hajir Biriyani", amount: 1000, date: "2025-05-17" },
    { type: "Expense", category: "Transportation", name: "Taxi Fare", vendor: "Uber", amount: 200, date: "2025-05-17" },
    { type: "Expense", category: "Shopping", name: "Polo Shirt", vendor: "XL fashions", amount: 350, date: "2025-05-17" },
    { type: "Expense", category: "Entertainment", name: "Playstation 5", vendor: "Gadget & Gear", amount: 30999, date: "2025-05-17" },
    { type: "Income", category: "Salary", name: "Monthly Pay", vendor: "Company", amount: 50000, date: "2025-05-15" },
  ]);

  const addTransaction = (newTransaction) => {
    const normalized = normalizeTransaction(newTransaction);
    setTransactions((prev) => [...prev, normalized]);
  };

  const removeTransaction = (index) => {
    if (index < 0 || index >= transactions.length) return; // guard
    setTransactions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions, addTransaction, removeTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};
