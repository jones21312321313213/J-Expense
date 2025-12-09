// src/services/transactionService.js
const API_BASE_URL = 'http://localhost:8080/api/transaction';

export const transactionService = {
  // Fetch all transactions for a specific user
  getTransactionsByUser: async (userId = 23) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getTransactionsByUser/${userId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const transactions = await response.json();

      // Map backend data to front-end format
      return transactions.map((t) => ({
        item: t.name,
        date: t.creation_date.split('T')[0], // Only date part
        amount: `₱${Number(t.amount).toLocaleString()}`,
        type: t.incomeFlag ? 'income' : 'expense',
      }));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  // Create a new transaction
  createTransaction: async (transactionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/insertTransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  // Delete a transaction by ID
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

  // Update a transaction
  updateTransaction: async (transactionId, transactionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updateTransaction?tid=${transactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },
};
