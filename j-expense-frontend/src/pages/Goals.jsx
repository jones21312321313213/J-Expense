/**
 * Goals Component
 * ----------------
 * This component serves as the main dashboard for managing user goals.
 *
 * Features:
 *  - Displays a grid of existing goals using GoalProgressCard
 *  - Provides an "Add" button to open the SelectGoalType modal for adding new goals
 *  - Supports dynamic addition of goals with real-time state updates
 *  - Scrollable grid layout for multiple goals
 *  - Modal overlay for goal creation using SelectGoalType
 *
 * State:
 *  - goals: array, stores all created goal objects
 *  - showSelectGoalType: boolean, toggles visibility of the goal type selection modal
 *
 * Usage:
 *  - Typically used as a page or section in a dashboard
 *  - Can handle multiple goals and allows easy creation of new goals
 *
 * Notes:
 *  - Each goal object passed to GoalProgressCard must include:
 *      - name
 *      - amount
 *      - startDate
 *      - endDate
 *      - saved
 *      - progress
 *  - Inline styles are used for layout and appearance
 */


import React, { useState } from "react";
import Add from "../Components/Add";
import SelectGoalType from "../Components/Goals/SelectGoalType";
import GoalProgressCard from "../Components/Goals/GoalProgressCard";

function Goals() {
  const [showSelectGoalType, setShowSelectGoalType] = useState(false);

  const [goals, setGoals] = useState([]);

  const containerStyle = {
    width: "100%",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    padding: "20px",
    position: "relative",
  };

  const scrollAreaStyle = {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    paddingRight: "10px",
    paddingLeft: "10px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: goals.length === 0 ? "1fr" : "repeat(2, 1fr)",
    gap: "30px",
    paddingBottom: "20px",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    textAlign: "center",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };
  const addButtonStyle = { 
    borderRadius: "30px",
    overflow: "hidden", 
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    height: "90px",
    display: "flex", justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", 
    cursor: "pointer" };


  const handleAddGoal = (newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
    setShowSelectGoalType(false);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>GOAL</h1>

      {/* Scroll area */}
      <div style={scrollAreaStyle}>
        <div style={gridStyle}>
          {/* Render all goals */}
          {goals.map((goal, index) => (
            <GoalProgressCard key={index} data={goal} />
          ))}

          {/* Add Button */}
          <div  style = {addButtonStyle} onClick={() => setShowSelectGoalType(true)}>
            <Add />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showSelectGoalType && (
        <div style={overlayStyle}>
          <SelectGoalType
            onClose={() => setShowSelectGoalType(false)}
            onSubmit={handleAddGoal} 
          />
        </div>
      )}
    </div>
  );
}

export default Goals;
