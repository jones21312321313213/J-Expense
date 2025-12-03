import Add from "../Components/Add";
import { useState } from "react";
import SelectBudgetType from "../Components/Budget/SelectBudgetType";

function Budgets() {
    

    const [isModalOpen, setIsModalOpen] = useState(false);

    // this is for testing to see if button would resize after adding things

    const [budgets, setBudgets] = useState([]);
    const addBudget = () => {
        const newBudget = { id: budgets.length + 1, name: `Budget ${budgets.length + 1}` };
        setBudgets([...budgets, newBudget]);
    };

    //


    const openModal = () => {
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };


    const containerStyle = {
        maxHeight: "800px", 
        overflowY: "auto",
        padding: "10px",
        margin: "0 auto",
        maxWidth: "1500px",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: budgets.length === 0 ? "1fr" : "repeat(2, 1fr)", // full width if no budgets
        gap: "20px",
    };

    const itemStyle = {
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
    };

    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensure it's above other content
    };



    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Budgets</h1>
            <div style={containerStyle}>
                <div style={gridStyle}>
                    {budgets.map((budget) => (
                        <div key={budget.id} style={itemStyle}>
                            {budget.name}
                        </div>
                    ))}

                    {/* Add button - Now uses the Add component and opens the modal */}
                    <div
                        style={{
                            ...itemStyle,
                            gridColumn: budgets.length === 0 ? "span 2" : "auto", // span 2 columns if no budgets
                        }}
                    >

                        <Add onClick={openModal} />
                    </div>
                </div>
            </div>

            {/* Modal - Conditionally rendered based on isModalOpen state */}
            {isModalOpen && (
                <div style={modalOverlayStyle} onClick={closeModal}>

                    <SelectBudgetType 
                        onClose={closeModal} 
                        // prevents closing the modal when clicking inside the SelectBudgetType component
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}

export default Budgets;