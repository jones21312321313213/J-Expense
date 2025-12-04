import Sidebar from "../Components/Sidebar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import bgImage from "../assets/dashbg.jpg";
import AddTransactionButton from "../Components/AddTransactionButton"; // import your FAB

function Base() {
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
        padding: "20px"
    };

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />

            {/* Background wrapper for all routed pages */}
            <div style={contentBgStyle}>
                <Outlet />

                {/* Floating Add Transaction Button */}
                <AddTransactionButton />
            </div>
        </div>
    );
}

export default Base;
