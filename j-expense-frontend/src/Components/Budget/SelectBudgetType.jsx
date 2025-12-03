import React, { useState } from 'react'
import SetAmount from '../setAmount'

function SelectBudgetType({ onClose, onCreateBudget }) {
    const [showSetAmount, setShowSetAmount] = useState(false)
    const [pendingType, setPendingType] = useState(null)

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "linear-gradient(135deg, #C0EBFF, #FFEFCB)",
        padding: "40px", 
        fontFamily: "Arial, sans-serif",
        borderRadius: "20px",
        width: "500px",
        height: "500px",
        position: 'relative', // IMPORTANT for positioning the close button
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Added shadow for "pop-out" effect
    };

    const cardContainer = {
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        marginTop: "30px",
        width: "100%",
    };

    const cardStyle = {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#e0e0e0",
        cursor: "pointer",
        transition: "transform 0.2s",
    };
    
    // Style for the close button
    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '15px',
        border: 'none',
        background: 'none',
        fontSize: '2rem', // Larger 'x'
        cursor: 'pointer',
        color: '#333',
        zIndex: 1, // Ensure it's clickable
    };

    const iconStyle = {
        fontSize: "2.5rem",
        color: "grey",
    };

    // When a type is chosen, open the amount modal
    const handleSelection = (type) => {
        setPendingType(type)
        setShowSetAmount(true)
    };

    const handleConfirmAmount = (amount) => {
        // If parent provided a creator, call it; otherwise show an alert for now
        if (onCreateBudget) onCreateBudget({ type: pendingType, amount })
        else alert(`Create ${pendingType} with amount ${amount}`)

        // close amount modal and this selector
        setShowSetAmount(false)
        setPendingType(null)
        onClose()
    }

    const handleCancelAmount = () => {
        setShowSetAmount(false)
        setPendingType(null)
    }

    return (
        <div style={containerStyle}>
            {/* Close Button */}
            <button style={closeButtonStyle} onClick={onClose}>
                &times;
            </button>
            
            <h1 style={{ marginBottom: "20px" }}>Select Budget Type</h1>
            <div style={cardContainer}>
                <div style={cardStyle} onClick={() => handleSelection("Savings Budget")}>
                    <i className="bi bi-piggy-bank" style={iconStyle}></i>
                    <div>
                        <h3>Savings Budget</h3>
                        <p>Track your income and budget your savings</p>
                    </div>
                </div>

                <div style={cardStyle} onClick={() => handleSelection("Expense Budget")}>
                    <i className="bi bi-wallet2" style={iconStyle}></i>
                    <div>
                        <h3>Expense Budget</h3>
                        <p>Track your expenses and budget your spending</p>
                    </div>
                </div>
            </div>

            {showSetAmount && (
                <SetAmount
                    initialValue={0}
                    title={pendingType ? `Set ${pendingType} Amount` : 'Set Amount'}
                    onConfirm={handleConfirmAmount}
                    onClose={handleCancelAmount}
                />
            )}
        </div>
    );
}

export default SelectBudgetType;