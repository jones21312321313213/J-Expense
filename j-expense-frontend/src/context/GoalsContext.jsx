import { createContext, useContext, useState } from "react";

const GoalsContext = createContext(null);

// ✅ Export provider as a const arrow function (consistent with hook export)
export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const addGoal = (goal) => {
    const enrichedGoal = {
      ...goal,
      currentAmount: 0,
      transactionCount: 0,
    };
    setGoals((prev) => [...prev, enrichedGoal]);
  };

  const updateGoalProgress = (goalId, amount) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? {
              ...g,
              currentAmount: g.currentAmount + amount,
              transactionCount: g.transactionCount + 1,
            }
          : g
      )
    );
  };

  const value = { goals, addGoal, updateGoalProgress };

  return (
    <GoalsContext.Provider value={value}>
      {children}
    </GoalsContext.Provider>
  );
};

// ✅ Export hook as a const arrow function (Fast Refresh safe)
export const useGoals = () => {
  const ctx = useContext(GoalsContext);
  if (!ctx) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return ctx;
};
