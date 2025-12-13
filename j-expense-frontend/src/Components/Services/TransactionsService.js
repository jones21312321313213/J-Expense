const API_BASE_URL = 'http://localhost:8080/api/transaction';


export const transactionService = {
  // Fetch all transactions for a given userId or the logged-in user (localStorage fallback)
   getTransactionsByUser: async (userId) => {
    // userId can be passed; otherwise use localStorage 'jexpense_user' for logged in user
    if (!userId) {
      try{
        const stored = localStorage.getItem('jexpense_user');
        if (stored) userId = JSON.parse(stored).userID;
      }catch(e){}
    }
    try {
      const response = await fetch(`${API_BASE_URL}/getTransactionsByUser/${userId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const transactions = await response.json();

      // IMPORTANT: return amount as number here (don't format with currency)
      return transactions.map((t) => ({
        id: t.billID || t.id,
        item: t.name,
        date: t.creation_date?.split('T')[0] || "",
        description: t.description || "-",
        amount: Number(t.amount) || 0,
        type: t.incomeFlag ? 'income' : 'expense',
        categoryName: t.category?.name || "",
        isRecurring: !!(t.recurringTransactions && t.recurringTransactions.length > 0) || !!t.isRecurring,
        recurringRaw: (t.recurringTransactions && t.recurringTransactions[0]) || t.recurringTransaction || null,
        paymentMethod: t.paymentMethod || (t.expense ? t.expense.payment_method : "") || "",
        incomeType: t.type || (t.income ? t.income.type : "") || "",
      }));

    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  // Fetch a single transaction by ID (returns cleaned shape used by EditTransaction)
// transactionService.getTransactionById
  getTransactionById: async (transactionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getTransaction/${transactionId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const t = await response.json();

      // payment method / income type
      let paymentMethod = "";
      if (!t.isIncome && t.expense) {
        paymentMethod = t.expense.payment_method || "";
      } else if (t.paymentMethod) {
        paymentMethod = t.paymentMethod;
      }

      let incomeType = "";
      if (t.isIncome && t.income) {
        incomeType = t.income.type || "";
      } else if (t.type) {
        incomeType = t.type;
      }

      // Recurrence: support DTO (t.isRecurring, t.intervalDays, t.recurringDate)
      // or Entity with recurringTransactions array
      let periodLength = 1;
      let periodUnit = "Day";
      let endDate = "";

      if (t.isRecurring) {
        periodLength = t.intervalDays ?? periodLength;
        if (t.recurringDate) {
          try {
            const d = new Date(t.recurringDate);
            if (!isNaN(d.getTime())) endDate = d.toISOString().split('T')[0];
          } catch (e) {
            endDate = t.recurringDate;
          }
        }
      } else if (t.recurringTransactions && t.recurringTransactions.length > 0) {
        const rec = t.recurringTransactions[0];
        periodLength = rec.intervalDays ?? periodLength;
        if (rec.recurringDate) {
          try {
            const d = new Date(rec.recurringDate);
            if (!isNaN(d.getTime())) endDate = d.toISOString().split('T')[0];
          } catch (e) {
            endDate = rec.recurringDate;
          }
        }
      } else if (t.recurringTransaction) {
        // in case older property name existed
        periodLength = t.recurringTransaction.intervalDays ?? periodLength;
        if (t.recurringTransaction.recurringDate) {
          try {
            const d = new Date(t.recurringTransaction.recurringDate);
            if (!isNaN(d.getTime())) endDate = d.toISOString().split('T')[0];
          } catch (e) {
            endDate = t.recurringTransaction.recurringDate;
          }
        }
      }

      return {
        id: t.billID || t.id,
        name: t.name,
        amount: Number(t.amount) || 0,
        creation_date: t.creation_date,
        description: t.description || "",
        incomeFlag: t.isIncome ?? t.incomeFlag,
        categoryName: (t.category && t.category.name) || t.categoryName || "",
        isRecurring: !!(t.isRecurring || (t.recurringTransactions && t.recurringTransactions.length > 0)),
        paymentMethod,
        incomeType,
        periodLength,
        periodUnit,
        endDate,
        recurringRaw: t.recurringTransactions ? t.recurringTransactions[0] : (t.recurringTransaction || null),
      };
    } catch (error) {
      console.error("Error fetching transaction by ID:", error);
      throw error;
    }
  },


  // Create a new transaction (retain as-is)
  createTransaction: async (transactionData) => {
    try {
      // If userID not present, try to obtain it from localStorage
      const dataWithUser = { ...transactionData };
      if (!dataWithUser.userID) {
        try{
          const stored = localStorage.getItem('jexpense_user');
          if (stored) dataWithUser.userID = JSON.parse(stored).userID;
        }catch(e){}
      }
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
