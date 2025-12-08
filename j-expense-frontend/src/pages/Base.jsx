// src/pages/Base.jsx
import Sidebar from "../Components/Sidebar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import bgImage from "../assets/dashbg.jpg";
import AddTransactionButton from "../Components/Transactions/AddTransactionButton";


function Base() {
  // Disable zoom shortcuts
  useEffect(() => {
    const handleZoomEvent = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.type === "wheel") {
        e.preventDefault();
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "0")
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleZoomEvent, { passive: false });
    window.addEventListener("keydown", handleZoomEvent, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleZoomEvent);
      window.removeEventListener("keydown", handleZoomEvent);
    };
  }, []);

  // Background style for main content
  const contentBgStyle = {
    flex: 1,
    marginLeft: "260px", // 👈 tightened from 280px to 260px
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflowY: "auto", // ensures vertical scrolling
    position: "relative", // needed for FAB positioning
    padding: "20px",
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Scrollable content area */}
      <div style={contentBgStyle}>
        <Outlet />
        <AddTransactionButton />
      </div>
    </div>
  );
}

export default Base;
