import React, { useEffect, useState } from "react";
import ActivityLogCard from "../Components/ActivityLogCard";
import { activityLogService } from "../Components/Services/ActivityLogService";

function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await activityLogService.getUserActivities();
        setActivities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const containerStyle = {
    height: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  };

  const headerStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  };

  const backButtonStyle = {
    position: "absolute",
    left: "20px",
    top: "20px",
    fontSize: "24px",
    cursor: "pointer",
    color: "#333",
  };

  const scrollAreaStyle = {
    width: "100%",
    maxWidth: "500px",
    overflowY: "scroll", // allow scrolling
    padding: "0 10px",
    flexGrow: 1,
    // Hide scrollbar
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE 10+
  };

  const addButtonWrapperStyle = {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    zIndex: 10,
  };

  const addButtonIconStyle = {
    backgroundColor: "#4C4C4C",
    borderRadius: "50%",
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      {/* Back button */}
      <i className="bi bi-arrow-left" style={backButtonStyle}></i>

      {/* Header */}
      <h1 style={headerStyle}>Activity Log</h1>

      {/* Scrollable content area */}
      <div style={scrollAreaStyle} className="hide-scrollbar">
        {loading ? (
          <p>Loading...</p>
        ) : activities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          activities.map((activity) => (
            <ActivityLogCard
              key={activity.id}
              date={activity.date}
              title={activity.title}
              amount={activity.amount}
              type={activity.type.toLowerCase()}
              category={activity.category}
              iconName={activity.iconName}
            />
          ))
        )}
      </div>

      {/* Add button */}
      <div style={addButtonWrapperStyle}>
        <div style={addButtonIconStyle}>
          <i className="bi bi-plus"></i>
        </div>
      </div>

      {/* Inline style to hide scrollbar for Webkit browsers */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}

export default ActivityLog;
