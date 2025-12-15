const API_BASE_URL = "http://localhost:8080/api/transaction";

/* =======================
   AUTH HELPERS
======================= */
const getUserId = () => {
  return localStorage.getItem("userId");
};

const getToken = () => {
  return localStorage.getItem("token");
};

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

/* =======================
   TRANSACTION SERVICE
======================= */
export const transactionService = {
  /* -----------------------
     GET ALL TRANSACTIONS
  ----------------------- */
  getTransactionsByUser: async () => {
    const userId = getUserId();
    if (!userId) throw new Error("User not logged in");

    try {
      const response = await fetch(
        `${API_BASE_URL}/getTransactionsByUser/${userId}`,
        {
          headers: authHeaders(),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const transactions = await response.json();

      return transactions.map((t) => ({
        id: t.billID || t.id,
        name: t.name,
        date: t.creation_date?.split("T")[0] || "",
        description: t.description || "-",
        amount: Number(t.amount) || 0,
        type: t.incomeFlag ? "income" : "expense",
        // ✅ FIX: map backend category_name into category
        category: t.category?.category_name || "",
        categoryId: t.category?.categoryID || null,
        isRecurring:
          !!(
            t.recurringTransactions &&
            t.recurringTransactions.length > 0
          ) || !!t.isRecurring,
        recurringRaw:
          (t.recurringTransactions && t.recurringTransactions[0]) ||
          t.recurringTransaction ||
          null,
        paymentMethod:
          t.paymentMethod ||
          (t.expense ? t.expense.payment_method : "") ||
          "",
        incomeType: t.type || (t.income ? t.income.type : "") || "",
      }));
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  },

  /* -----------------------
     GET SINGLE TRANSACTION
  ----------------------- */
  getTransactionById: async (transactionId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/getTransaction/${transactionId}`,
        {
          headers: authHeaders(),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const t = await response.json();

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

      let periodLength = 1;
      let periodUnit = "Day";
      let endDate = "";

      const rec =
        (t.recurringTransactions && t.recurringTransactions[0]) ||
        t.recurringTransaction;

      if (rec) {
        periodLength = rec.intervalDays ?? periodLength;
        if (rec.recurringDate) {
          const d = new Date(rec.recurringDate);
          if (!isNaN(d.getTime()))
            endDate = d.toISOString().split("T")[0];
        }
      }

      return {
        id: t.billID || t.id,
        name: t.name,
        amount: Number(t.amount) || 0,
        creation_date: t.creation_date,
        description: t.description || "",
        incomeFlag: t.isIncome ?? t.incomeFlag,
        category: t.category?.category_name || "",
        categoryId: t.category?.categoryID || null,
        isRecurring: !!rec,
        paymentMethod,
        incomeType,
        periodLength,
        periodUnit,
        endDate,
        recurringRaw: rec || null,
      };
    } catch (error) {
      console.error("Error fetching transaction by ID:", error);
      throw error;
    }
  },

  /* -----------------------
     CREATE TRANSACTION
  ----------------------- */
  createTransaction: async (transactionData) => {
    const userId = getUserId();
    if (!userId) throw new Error("User not logged in");

    try {
      const response = await fetch(
        `${API_BASE_URL}/insertTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
          },
          body: JSON.stringify({
            ...transactionData,
            userID: userId,
          }),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  },

  /* -----------------------
     UPDATE TRANSACTION
  ----------------------- */
  updateTransaction: async (transactionId, transactionData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/updateTransaction?tid=${transactionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
          },
          body: JSON.stringify(transactionData),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  },

  /* -----------------------
     DELETE TRANSACTION
  ----------------------- */
  deleteTransaction: async (transactionId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/deleteTransaction/${transactionId}`,
        {
          method: "DELETE",
          headers: authHeaders(),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      return true;
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  },
};
