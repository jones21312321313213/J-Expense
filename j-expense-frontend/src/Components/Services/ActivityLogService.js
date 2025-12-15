const API_BASE_URL = "http://localhost:8080/api/logs";

/* =======================
   AUTH HELPERS
======================= */
const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

/* =======================
   ACTIVITY LOG SERVICE
======================= */
export const activityLogService = {
  getUserActivities: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        headers: authHeaders(),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const activities = await response.json();

      return activities.map((a) => ({
        id: a.id,
        title: a.title,
        amount: a.amount ?? 0,
        date: a.date ? a.date.split("T")[0] : "",
        type: a.type.toUpperCase(), // "INCOME", "EXPENSE", "GOAL", "BUDGET"
        category: a.category || "",
        iconName:
          a.type === "INCOME"
            ? "bi-arrow-up-circle-fill"
            : a.type === "EXPENSE"
            ? "bi-arrow-down-circle-fill"
            : a.type === "GOAL"
            ? "bi-piggy-bank-fill" 
            : "bi-handbag-fill",
      }));
    } catch (error) {
      console.error("Error fetching activity log:", error);
      throw error;
    }
  },
};
