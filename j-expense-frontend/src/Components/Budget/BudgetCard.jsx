import React from "react";

// The component accepts all dynamic budget details as props
function BudgetCard({ budgetName, amount, period, dateRange, categories, onDelete,onClick }) {
    
    // Default values for demonstration if props are not provided
    const defaultName = "Name of budget";
    const defaultAmount = 200;
    const defaultPeriod = "month";
    const defaultDateRange = "Sept 1 - Sept 30";
    const defaultCategories = "All categories budget";

    // Use provided props or fall back to defaults
    const name = budgetName || defaultName;
    const displayAmount = `₱ ${amount || defaultAmount}/ ${period || defaultPeriod}`;
    const displayDate = dateRange || defaultDateRange;
    const displayCategories = categories || defaultCategories;


    // --- Inline Styles matching the image_582e0f.png ---

    const cardContainerStyle = {
        backgroundColor: "#FFF8E1", // Pale yellow/cream background
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
        boxSizing: "border-box",
        marginBottom: "15px", // Spacing for lists
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start", // Align content to the top
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        cursor: "pointer", // Suggests the card is clickable
    };

    const textContentStyle = {
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        flexGrow: 1, // Allows text content to take up most space
    };

    const nameStyle = {
        fontSize: "18px",
        fontWeight: "600",
        color: "#333",
        lineHeight: "1.3",
    };

    const amountStyle = {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
        lineHeight: "1.5",
    };

    const dateStyle = {
        fontSize: "16px",
        color: "#333",
        lineHeight: "1.5",
    };

    const categoriesStyle = {
        fontSize: "14px",
        color: "#666",
        marginTop: "5px",
    };

    const deleteIconStyle = {
        fontSize: "28px", // Large size for the trash icon
        color: "#333",
        cursor: "pointer",
        padding: "10px", // Clickable area padding
        alignSelf: "center", // Center the icon vertically relative to the card height
    };

    // Handler function (optional, for navigation if card is clicked)
    const handleCardClick = () => {
        console.log(`Budget Card clicked: ${name}`);
        // Typically, this would navigate to a budget editing screen
        // navigate('/edit-budget', { state: { budgetName, amount, dateRange } });
    };



    return (
        <div style={cardContainerStyle} onClick={onClick}>
            <div style={textContentStyle}>
                <span style={nameStyle}>{budgetName || "Name of budget"}</span>
                <span style={amountStyle}>₱ {amount || 200}/ {period || "month"}</span>
                <span style={dateStyle}>{dateRange || "Sept 1 - Sept 30"}</span>
                <span style={categoriesStyle}>{categories || "All categories budget"}</span>
            </div>

            <i
                className="bi bi-trash3-fill"
                style={deleteIconStyle}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onClick for edit
                    onDelete && onDelete(budgetName);
                }}
            ></i>
        </div>
    );
}

export default BudgetCard;