const API_BASE = "http://localhost:8080/api/goals";

// Helper to get Authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
};

const GoalService = {
  getMyGoals: async () => {
    const res = await fetch(`${API_BASE}/my-goals`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch goals");
    return res.json();
  },

  addGoal: async (goal) => {
    const res = await fetch(`${API_BASE}/addGoal`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(goal),
    });
    if (!res.ok) throw new Error("Failed to add goal");
    return res.json();
  },

  updateGoal: async (id, updatedGoal) => {
    const res = await fetch(`${API_BASE}/updateGoal/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedGoal),
    });
    if (!res.ok) throw new Error("Failed to update goal");
    return res.json();
  },

  deleteGoal: async (id) => {
    const res = await fetch(`${API_BASE}/deleteGoal/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete goal");
    return true;
  },
};

export default GoalService;
