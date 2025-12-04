import React, { useState } from 'react'
import SetAmount from '../setAmount'
import SelectCategory from '../../Components/Category/SelectCategory'

function SelectBudgetType({ onClose, onCreateBudget }) {
    const [showSetAmount, setShowSetAmount] = useState(false)
    const [pendingType, setPendingType] = useState(null)
    const [selectedAmount, setSelectedAmount] = useState(null)

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
    const [showCategory, setShowCategory] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleSelection = (type) => {
        console.log('SelectBudgetType: handleSelection', type)
        setPendingType(type)
        // open category selector next
        setShowCategory(true)
    };

    const handleCategorySelect = (category) => {
        console.log('SelectBudgetType: category selected', category)
        setSelectedCategory(category)
        // do not open amount automatically - user will click the amount field in SelectCategory
        setShowCategory(true)
    }

    const requestSetAmount = () => {
        // open the inline SetAmount when requested by SelectCategory
        setShowSetAmount(true)
    }

    const handleConfirmAmount = (amount) => {
        // set the selected amount and close only the amount input; allow user to continue editing category details
        setSelectedAmount(amount)
        setShowSetAmount(false)
    }

    const handleSaveChanges = (extra = {}) => {
        // finalise creating the budget using selected values
        const payload = { type: pendingType, category: selectedCategory, amount: selectedAmount, ...extra }
        if (onCreateBudget) onCreateBudget(payload)
        else alert(`Create ${payload.type} | ${payload.category} with amount ${payload.amount}`)

        // reset and close selector
        setShowSetAmount(false)
        setShowCategory(false)
        setPendingType(null)
        setSelectedCategory(null)
        setSelectedAmount(null)
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
                {!showCategory ? (
                    <>
                        <div style={cardStyle} onClick={() => handleSelection("Savings Budget") }>
                            <i className="bi bi-piggy-bank" style={iconStyle}></i>
                            <div>
                                <h3>Savings Budget</h3>
                                <p>Track your income and budget your savings</p>
                            </div>
                        </div>

                        <div style={cardStyle} onClick={() => handleSelection("Expense Budget") }>
                            <i className="bi bi-wallet2" style={iconStyle}></i>
                            <div>
                                <h3>Expense Budget</h3>
                                <p>Track your expenses and budget your spending</p>
                            </div>
                        </div>
                    </>
                ) : (
                    // Render category selector when a type has been chosen
                    <div style={{ width: '100%' }}>
                        <SelectCategory
                            selectedCategory={selectedCategory}
                            amountValue={selectedAmount}
                            onSelect={handleCategorySelect}
                            onRequestSetAmount={requestSetAmount}
                            onSave={(extra) => handleSaveChanges(extra)}
                            onClose={() => { setShowCategory(false); onClose() }}
                        />
                    </div>
                )}
            </div>

            {showSetAmount && (
                <SetAmount
                    inline={true}
                    initialValue={0}
                    title={pendingType && selectedCategory ? `Set ${pendingType} • ${selectedCategory} Amount` : 'Set Amount'}
                    onConfirm={handleConfirmAmount}
                    onClose={handleCancelAmount}
                />
            )}
        </div>
    );
}

export default SelectBudgetType;