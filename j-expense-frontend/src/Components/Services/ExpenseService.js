import { transactionService } from "./TransactionsService";

const categoryMap = {
  1: "Food",
  2: "Transportation",
  3: "Shopping",
  4: "Entertainment",
  5: "Grocery",
  6: "Miscellaneous",
  7: "Grocery" 
};

export const expenseService = {
  /* -----------------------
     GET ALL EXPENSES
  ----------------------- */
  getExpensesByUser: async () => {
    const allTransactions = await transactionService.getTransactionsByUser();
    console.log("[ExpenseService] All transactions:", allTransactions);

    // ✅ Filter only expense transactions (is_income = 0)
    const expenses = allTransactions.filter(
      tx => tx.is_income === 0 || tx.type === "expense"
    );
    console.log("[ExpenseService] Filtered expenses:", expenses);

    const normalized = expenses.map(tx => {
      const normalizedCategory = categoryMap[tx.category_id] || "";

      console.log("[ExpenseService] Normalizing tx:", {
        bill_id: tx.bill_id,
        name: tx.name,
        rawCategoryId: tx.category_id,
        normalizedCategory
      });

      return {
        id: tx.bill_id,                  // use bill_id as id
        name: tx.name,                   // DB column
        description: tx.description,     // optional
        category: normalizedCategory,    // mapped category
        amount: Number(tx.amount),       // ensure numeric
        date: tx.creation_date           // DB column
      };
    });

    console.log("[ExpenseService] Normalized expenses:", normalized);
    return normalized;
  },

  /* -----------------------
     GET EXPENSES BY CATEGORY
  ----------------------- */
  getExpensesByCategory: async (category) => {
    const expenses = await expenseService.getExpensesByUser();
    const filtered = expenses.filter(tx => tx.category === category);
    console.log("[ExpenseService] Expenses for category:", category, filtered);
    return filtered;
  },

  /* -----------------------
     GET RECENT EXPENSES
  ----------------------- */
  getRecentExpenses: async (limit = 5) => {
    const expenses = await expenseService.getExpensesByUser();
    const recent = expenses
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);

    console.log("[ExpenseService] Recent expenses:", recent);
    return recent;
  }
};
