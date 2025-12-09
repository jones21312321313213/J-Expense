import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const GoalsContext = createContext();

export const useGoals = () => useContext(GoalsContext);

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔎 Fetch all goals from backend
  const fetchGoals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/goals/allGoals");
      setGoals(res.data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add new goal
  const addGoal = async (newGoal) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/goals/addGoal",
        newGoal
      );
      setGoals((prev) => [...prev, res.data]); // update local state
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  // ✏️ Update goal
  const updateGoal = async (id, updatedGoal) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/goals/updateGoal/${id}`,
        updatedGoal
      );
      setGoals((prev) =>
        prev.map((goal) => (goal.goalID === id ? res.data : goal))
      );
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };

  // ❌ Delete goal
  const deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/goals/deleteGoal/${id}`);
      setGoals((prev) => prev.filter((goal) => goal.goalID !== id));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  // Load goals on mount
  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <GoalsContext.Provider
      value={{ goals, addGoal, updateGoal, deleteGoal, loading }}
    >
      {children}
    </GoalsContext.Provider>
  );
};
