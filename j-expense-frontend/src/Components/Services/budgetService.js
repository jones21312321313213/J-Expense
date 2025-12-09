// src/services/budgetService.js
const API_BASE_URL = 'http://localhost:8080/api/budgets';

export const budgetService = {
  createBudget: async (budgetData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: budgetData.type,
          name: budgetData.name,
          category_name: budgetData.category,
          total_amount: budgetData.amount,
          period: budgetData.period,
          beginning: budgetData.beginning, // Format: "YYYY-MM-DD"
          frequency: budgetData.frequency
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating budget:', error);
      throw error;
    }
  },

  getAllBudgets: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching budgets:', error);
      throw error;
    }
  },

  getBudgetById: async (budgetID) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${budgetID}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching budget:', error);
      throw error;
    }
  },

  updateBudget: async (budgetID, budgetData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${budgetID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error updating budget:', error);
      throw error;
    }
  },

  deleteBudget: async (budgetID) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${budgetID}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return true;
    } catch (error) {
      console.error('Error deleting budget:', error);
      throw error;
    }
  },
};