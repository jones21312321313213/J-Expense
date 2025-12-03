// src/components/SelectBudgetType.jsx

function SelectBudgetType({ onClose }) {
  
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
        // Hover effect for better UX
        '&:hover': {
            transform: 'scale(1.02)',
        }
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

    // Handler to close the modal after an action (e.g., selecting a type)
    const handleSelection = (type) => {
        alert(`${type} clicked`);
        // In a real app, you would perform budget setup here, then close:
        onClose(); // Call the function passed from Budgets.js to close the modal
    };


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
        </div>
    );
}

export default SelectBudgetType;