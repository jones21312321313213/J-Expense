const API_BASE_URL = "http://localhost:8080/api/bills";

/* =======================
   AUTH HELPERS
======================= */
const getUserId = () => localStorage.getItem("userId");
const getToken = () => localStorage.getItem("token");
const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

/* =======================
   BILL SERVICE
======================= */
export const billService = {
  /* -----------------------
     GET ALL BILLS`
  ----------------------- */
  getBills: async () => {
    const userId = getUserId();
    if (!userId) throw new Error("User not logged in");

    try {
      const response = await fetch(`${API_BASE_URL}/getAllBills`, {
        headers: authHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const bills = await response.json();

      // Filter bills for current user (optional if backend already filters by user)
      const userBills = bills
        .filter((b) => b.user?.userID == userId)
        .map((b) => ({
          id: b.billID,
          name: b.billName,
          amount: Number(b.amount),
          dueDate: b.dueDate,
          status: b.status,
        }));

      return userBills;
    } catch (error) {
      console.error("Error fetching bills:", error);
      throw error;
    }
  },

  /* -----------------------
     GET SINGLE BILL
  ----------------------- */
  getBillById: async (billId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${billId}`, {
        headers: authHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const b = await response.json();

      return {
        id: b.billID,
        name: b.billName,
        amount: Number(b.amount),
        dueDate: b.dueDate,
        status: b.status,
      };
    } catch (error) {
      console.error("Error fetching bill by ID:", error);
      throw error;
    }
  },

  /* -----------------------
     CREATE BILL
  ----------------------- */
  createBill: async (billData) => {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify(billData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating bill:", error);
      throw error;
    }
  },

  /* -----------------------
     UPDATE BILL
  ----------------------- */
  updateBill: async (billId, billData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${billId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify(billData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating bill:", error);
      throw error;
    }
  },

  /* -----------------------
     DELETE BILL
  ----------------------- */
  deleteBill: async (billId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${billId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error deleting bill:", error);
      throw error;
    }
  },
};
