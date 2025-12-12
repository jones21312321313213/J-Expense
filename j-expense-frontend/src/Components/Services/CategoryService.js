// src/Components/Services/categoryService.js
const API_BASE_URL = 'http://localhost:8080/api/categories';

export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Create a new category
  createCategory: async (categoryData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // FIX: Using Snake_Case to match backend/DB fields
          category_name: categoryData.name, 
          iconPath: categoryData.icon || null,
          isDefault: categoryData.isDefault || false,
          category_type: categoryData.categoryType || 'Expense' 
        }),
      });
      
      if (response.status === 409) {
        throw new Error('Category already exists');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Delete a category
  deleteCategory: async (categoryID) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${categoryID}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },
};