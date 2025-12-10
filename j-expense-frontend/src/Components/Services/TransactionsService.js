const API_BASE_URL = 'http://localhost:8080/api/transaction';


export const transactionService = {
  // Fetch all transactions for userId 27 if wala mo ani find ur own user in ur own db
  getTransactionsByUser: async () => {
    const userId = 27; // hardcoded
    try {
      const response = await fetch(`${API_BASE_URL}/getTransactionsByUser/${userId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const transactions = await response.json();

      return transactions.map((t) => ({
        id: t.billID,
        item: t.name,
        date: t.creation_date?.split('T')[0] || "",
        description: t.description || "-",
        amount: `₱${Number(t.amount).toLocaleString()}`,
        type: t.incomeFlag ? 'income' : 'expense',
        categoryName: t.category?.name || "",
        isRecurring: t.recurringTransaction != null,
        paymentMethod: t.paymentMethod || "",
        incomeType: t.type || "",
      }));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  
  // Fetch a single transaction by ID
  getTransactionById: async (transactionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getTransaction/${transactionId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const t = await response.json();

      let paymentMethod = "";
      let incomeType = "";

      // Get payment method for expenses
      if (!t.incomeFlag && t.expense) {
        paymentMethod = t.expense.payment_method || "";
      }

      // Get type for income
      if (t.incomeFlag && t.income) {
        incomeType = t.income.type || "";
      }

      // Get recurring transaction data
      let periodLength = 1;
      let periodUnit = "Day";
      let endDate = "";
      
      if (t.recurringTransaction) {
        periodLength = t.recurringTransaction.periodLength || 1;
        periodUnit = t.recurringTransaction.periodUnit || "Day";
        endDate = t.recurringTransaction.endDate || "";
      }

      return {
        id: t.billID,
        name: t.name,
        amount: t.amount,
        creation_date: t.creation_date,
        description: t.description || "",
        incomeFlag: t.incomeFlag,
        categoryName: t.category?.name || "",
        isRecurring: t.recurringTransaction != null,
        paymentMethod,   // only for expenses
        incomeType,      // only for income
        periodLength,    // recurring transaction data
        periodUnit,      // recurring transaction data
        endDate          // recurring transaction data
      };

    } catch (error) {
      console.error("Error fetching transaction by ID:", error);
      throw error;
    }
  },


  // Create a new transaction (retain as-is)
  createTransaction: async (transactionData) => {
    try {
      const dataWithUser = { ...transactionData, userID: 27 };
      const response = await fetch(`${API_BASE_URL}/insertTransaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataWithUser),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  // Update a transaction
  updateTransaction: async (transactionId, transactionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updateTransaction?tid=${transactionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },

  // Delete a transaction
  deleteTransaction: async (transactionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deleteTransaction/${transactionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },
};
