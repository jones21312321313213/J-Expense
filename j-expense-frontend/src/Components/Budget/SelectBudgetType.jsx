/**
 * SelectBudgetType Component
 * -------------------------
 * This component handles the creation of a new budget in the app.
 * It provides a step-by-step interface for the user:
 * 
 * 1. **Select Budget Type**: User chooses between "Savings Budget" or "Expense Budget".
 * 2. **Fill Budget Details**: 
 *    - Name of the budget
 *    - Amount (entered via SetAmount modal)
 *    - Frequency and period unit
 *    - Beginning date
 * 3. **Select Category**: User picks a category for the budget (e.g., Food, Rent).
 * 4. **Add Budget**: The entered information is validated and then passed back to the parent component via `onCreateBudget`.
 * 
 * State management:
 * - Uses `useState` to manage current selections, input values, modal visibility, and error messages.
 * - `pendingType` determines whether the type selection screen or the full form is displayed.
 * - `selectedAmount` is updated via the SetAmount component.
 * 
 * Props:
 * - `onClose`: Function to close the modal.
 * - `onCreateBudget`: Function to receive the final budget data when the user confirms.
 */

import React, { useState } from 'react'
import AddBudget from "./AddBudget";
import SelectCategory from '../../Components/Category/SelectCategory'
import SetAmount from '../setAmount'
import { budgetService } from '../Services/budgetService'

function SelectBudgetType({ onClose, onCreateBudget }) {
    const [pendingType, setPendingType] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedAmount, setSelectedAmount] = useState(null)
    const [showSetAmount, setShowSetAmount] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // State for AddBudget inputs
    const [name, setName] = useState('')
    const [amountValue, setAmountValue] = useState(null)
    const [frequency, setFrequency] = useState(1)
    // periodUnit should be driven by user selection (Daily/Weekly/Monthly/Yearly)
    // default to 'Month' so the underline shows Month by default when opening
    const [periodUnit, setPeriodUnit] = useState('Month')
    const [beginning, setBeginning] = useState('')
    const [error, setError] = useState(null)

    // ---- Handlers ----
    const handleSelection = (type) => setPendingType(type)
    const handleCategorySelect = (category) => setSelectedCategory(category)
    const requestSetAmount = () => setShowSetAmount(true)
    const handleConfirmAmount = (amount) => {
        setSelectedAmount(amount)
        setShowSetAmount(false)
    }

    const handleAddBudget = async (extra = {}) => {
        // Reset previous error
        setError(null);
        setIsLoading(true);

        // Merge values: prefer values passed in `extra` (from SelectCategory) otherwise use component state
        const mergedName = (extra.name && extra.name.trim()) || name.trim();
        const mergedFrequency = extra.frequency !== undefined ? Number(extra.frequency) : Number(frequency);
        const mergedBeginning = extra.beginning || beginning;
        const mergedPeriodRaw = extra.periodUnit || periodUnit;

        // Validate each field individually
        if (!selectedCategory) {
            setIsLoading(false);
            return setError("Please select a category");
        }
        if (!mergedName) {
            setIsLoading(false);
            return setError("Please enter a budget name");
        }
        if (!selectedAmount || selectedAmount <= 0) {
            setIsLoading(false);
            return setError("Please set a valid budget amount");
        }
        if (!mergedFrequency || mergedFrequency <= 0) {
            setIsLoading(false);
            return setError("Please enter a valid frequency");
        }
        if (!mergedPeriodRaw) {
            setIsLoading(false);
            return setError("Please select a period unit");
        }
        if (!mergedBeginning) {
            setIsLoading(false);
            return setError("Please select a beginning date");
        }

        // Normalize periodUnit to a canonical short form so budgets computation is consistent
        const normalizePeriod = (p) => {
            if (!p) return '';
            const s = p.toString().toLowerCase();
            if (s.includes('day')) return 'Day';
            if (s.includes('week')) return 'Week';
            if (s.includes('month')) return 'Month';
            if (s.includes('year')) return 'Year';
            return p;
        };

        const canonicalPeriod = normalizePeriod(mergedPeriodRaw);

        // Build payload
        const payload = {
            type: pendingType,
            category: selectedCategory,
            name: mergedName,
            amount: selectedAmount,
            frequency: mergedFrequency,
            period: `${mergedFrequency} ${canonicalPeriod}`,
            beginning: mergedBeginning
        };

        try {
            // Call the backend API
            const savedBudget = await budgetService.createBudget(payload);
            console.log('Budget saved successfully:', savedBudget);

            // Call parent callback if provided
            if (onCreateBudget) {
                onCreateBudget(savedBudget);
            }

            // Show success message
            alert('Budget created successfully!');

            // Reset states after adding
            setPendingType(null);
            setSelectedCategory(null);
            setSelectedAmount(null);
            setName('');
            setFrequency(1);
            setPeriodUnit('Month');
            setBeginning('');
            setError(null);

            // Close modal
            onClose();
        } catch (error) {
            setError('Failed to create budget. Please try again.');
            console.error('Error creating budget:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelAmount = () => setShowSetAmount(false)

    // ---- Styles ----
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "linear-gradient(135deg, #C0EBFF, #FFEFCB)",
        padding: "40px", 
        fontFamily: "Arial, sans-serif",
        borderRadius: "20px",
        width: "650px",
        minHeight: "750px",
        position: 'relative',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        overflowY: 'auto'
    }

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '15px',
        border: 'none',
        background: 'none',
        fontSize: '2rem',
        cursor: 'pointer',
        color: '#333',
        zIndex: 1,
    }

    return (
        <div style={containerStyle}>
            <button style={closeButtonStyle} onClick={onClose}>
                &times;
            </button>

            {!pendingType && (
                <>
                    <h1 style={{ marginBottom: "20px" }}>Select Budget Type</h1>
                    <div style={{ display: "flex", flexDirection: "column", gap: "25px", marginBottom: "20px", width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "20px", borderRadius: "10px", backgroundColor: "#e0e0e0", cursor: "pointer" }} onClick={() => handleSelection("Savings Budget")}>
                            <i className="bi bi-piggy-bank" style={{ fontSize: "2.5rem", color: "grey" }}></i>
                            <div>
                                <h3>Savings Budget</h3>
                                <p>Track your income and budget your savings</p>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "20px", borderRadius: "10px", backgroundColor: "#e0e0e0", cursor: "pointer" }} onClick={() => handleSelection("Expense Budget")}>
                            <i className="bi bi-wallet2" style={{ fontSize: "2.5rem", color: "grey" }}></i>
                            <div>
                                <h3>Expense Budget</h3>
                                <p>Track your expenses and budget your spending</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {pendingType && (
                <>
                    {/* AddBudget on top */}
                    <AddBudget
                        name={name}
                        setName={setName}
                        amountValue={selectedAmount}
                        frequency={frequency}
                        setFrequency={setFrequency}
                        periodUnit={periodUnit}
                        setPeriodUnit={setPeriodUnit}
                        beginning={beginning}
                        setBeginning={setBeginning}
                        onRequestSetAmount={requestSetAmount}
                        error={error}
                        setError={setError}
                    />

                    {/* Category selector at bottom */}
                    <div style={{ width: '100%', marginTop: '20px' }}>
                        <SelectCategory
                            selectedCategory={selectedCategory}
                            amountValue={selectedAmount}
                            onSelect={handleCategorySelect}
                            onRequestSetAmount={requestSetAmount}
                            onSave={handleAddBudget}  // save button triggers Add Budget
                            onClose={onClose}
                        />
                    </div>

                    {/* Add Budget Button at bottom */}
                    <button
                        onClick={handleAddBudget}
                        disabled={isLoading}
                        style={{
                            marginTop: '30px',
                            width: '100%',
                            maxWidth: '400px',
                            padding: '20px',
                            fontSize: '1.3rem',
                            background: isLoading ? '#cccccc' : 'rgba(0, 128, 128, 0.7)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.6 : 1
                        }}
                    >
                        {isLoading ? 'Adding Budget...' : 'Add Budget'}
                    </button>
                </>
            )}

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
    )
}

export default SelectBudgetType