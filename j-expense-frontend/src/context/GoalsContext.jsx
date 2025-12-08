import { createContext, useContext, useState } from "react";

const GoalsContext = createContext(null);

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const addGoal = (goal) => {
    const enrichedGoal = {
      ...goal,
      currentAmount: 0,      // savings: amount saved; expense: amount spent
      transactionCount: 0,
    };
    setGoals((prev) => [...prev, enrichedGoal]);
  };

  /**
   * Update progress for a goal.
   * - Savings goal: add to currentAmount (saved).
   * - Expense goal: add to currentAmount (spent).
   */
  const updateGoalProgress = (goalId, amount, type) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;

        if (type === "savings") {
          return {
            ...g,
            currentAmount: g.currentAmount + amount,
            transactionCount: g.transactionCount + 1,
          };
        }

        if (type === "expense") {
          return {
            ...g,
            currentAmount: g.currentAmount + amount, // track spent
            transactionCount: g.transactionCount + 1,
          };
        }

        return g;
      })
    );
  };

  const value = { goals, addGoal, updateGoalProgress };

  return (
    <GoalsContext.Provider value={value}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const ctx = useContext(GoalsContext);
  if (!ctx) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return ctx;
};
