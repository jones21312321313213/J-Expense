import Sidebar from "../Components/Sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import bgImage from "../assets/dashbg.jpg";
import AddTransactionButton from "../Components/Transactions/AddTransactionButton";


function Base() {
    const [notificationOpen, setNotificationOpen] = useState(false);

    // Zoom disabling useEffect 
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

    // Background style
    const contentBgStyle = {
        flex: 1,
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "auto",
        position: "relative", // important for positioning the FAB
        padding: "20px",
        marginLeft: "280px" // Offset by sidebar width
    };

    const sidebarStyle = {
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        zIndex: 1000 // Ensure sidebar stays on top
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={sidebarStyle}>
                <Sidebar />
            </div>

            {/* Background wrapper for all routed pages */}
            <div style={contentBgStyle}>
                <Outlet context={{ notificationOpen, setNotificationOpen }} />

                {/* Floating Add Transaction Button - Hidden when notification panel is open */}
                {!notificationOpen && <AddTransactionButton />}
            </div>
        </div>
    );
}

export default Base;
