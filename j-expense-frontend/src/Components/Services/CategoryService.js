// src/Components/Services/categoryService.js
const API_BASE_URL = 'http://localhost:8080/api/categories';

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper to build auth headers
const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
});

export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        headers: authHeaders()
      });
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
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        headers: authHeaders()
      });
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
      const body = {
        category_name: categoryData.name,
        category_type: categoryData.categoryType || 'Expense'
      };

      if (categoryData.icon) body.iconPath = categoryData.icon;

      if (!categoryData.isDefault) {
        const stored = localStorage.getItem('jexpense_user');
        const fallbackUserID = stored ? JSON.parse(stored).userID : undefined;
        const resolvedUserID = categoryData.userID || fallbackUserID;
        if (resolvedUserID) body.userID = resolvedUserID;
      }

      if (categoryData.isDefault === true) body.isDefault = true;

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });

      if (response.status === 409) throw new Error('Category already exists');
      if (response.status === 400) {
        const text = await response.text();
        throw new Error(`Invalid request: ${text || 'Bad request (400)'}`);
      }
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

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
        headers: authHeaders()
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },

  // Get single category by id
  getCategoryById: async (categoryID) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${categoryID}`, { headers: authHeaders() });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching category by id:', error);
      throw error;
    }
  },

  // Update a category
  updateCategory: async (categoryID, categoryData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${categoryID}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`HTTP error! status: ${response.status} ${text}`);
      }
      // Some responses may not return a body; handle both
      const ct = response.headers.get('content-type') || '';
      if (ct.includes('application/json')) return await response.json();
      return true;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },
};
