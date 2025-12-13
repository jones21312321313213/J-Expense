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

	// Get categories for a specific user (includes default categories)
	getCategoriesByUser: async (userId) => {
		try {
			const response = await fetch(`${API_BASE_URL}/user/${userId}`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			return await response.json();
		} catch (error) {
			console.error('Error fetching categories for user:', error);
			throw error;
		}
	},

  // Create a new category
	createCategory: async (categoryData) => {
    try {
			// Build the request body, only include fields that are present
			const body = {
				category_name: categoryData.name,
				category_type: categoryData.categoryType || 'Expense'
			};

			if (categoryData.icon) body.iconPath = categoryData.icon;
			if (categoryData.userID) body.userID = categoryData.userID;
			if (categoryData.isDefault === true) body.isDefault = true;

			const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
		body: JSON.stringify(body),
      });
      
      if (response.status === 409) {
        throw new Error('Category already exists');
			}

			if (response.status === 400) {
				// Invalid user supplied
				const text = await response.text();
				throw new Error(`Invalid request: ${text || 'Bad request (400)'}`);
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