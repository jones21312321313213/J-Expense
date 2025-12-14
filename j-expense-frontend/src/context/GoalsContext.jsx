import React, { createContext, useContext, useEffect, useState } from "react";
import GoalService from "../Components/Services/GoalService";

const GoalsContext = createContext();

export const useGoals = () => useContext(GoalsContext);

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔎 Fetch all goals for the logged-in user
  const fetchGoals = async () => {
    try {
      setLoading(true);
      const data = await GoalService.getMyGoals();
      setGoals(data); // only sets goals for the logged-in user
    } catch (err) {
      console.error("Error fetching goals:", err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add new goal
  const addGoal = async (newGoal) => {
    try {
      const createdGoal = await GoalService.addGoal(newGoal);
      setGoals((prev) => [...prev, createdGoal]);
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  // ✏️ Update goal
  const updateGoal = async (id, updatedGoal) => {
    try {
      const updated = await GoalService.updateGoal(id, updatedGoal);
      setGoals((prev) =>
        prev.map((goal) => (goal.goalID === id ? updated : goal))
      );
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };

  // ❌ Delete goal
  const deleteGoal = async (id) => {
    try {
      await GoalService.deleteGoal(id);
      setGoals((prev) => prev.filter((goal) => goal.goalID !== id));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  // 🧹 Clear goals (call on logout)
  const clearGoals = () => {
    setGoals([]);
  };

  // Load goals on mount if token exists
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchGoals();
    }
  }, []);

  return (
    <GoalsContext.Provider
      value={{
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        clearGoals, // expose clearGoals
        loading,
        fetchGoals, // optionally expose fetchGoals to refresh manually
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};
