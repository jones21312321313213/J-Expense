/**
 * AddTransactionExpenses.jsx
 * --------------------------
 * Component for adding an expense transaction in the Add Transaction flow.
 *
 * Features:
 * - Input fields for:
 *   - Name of the expense.
 *   - Amount (opens `SetAmount` modal for input).
 *   - Date (opens `DatePicker` modal for selection).
 *   - Description (multi-line textarea).
 * - Error display area for validation messages.
 * - Responsive layout using flexbox for amount and date inputs.
 * - Read-only inputs trigger modals for interactive selection.
 *
 * Props:
 * - `name` (string): current name input value.
 * - `setName` (function): setter for name state.
 * - `amountValue` (number): current amount input value.
 * - `setAmountValue` (function): setter for amount state.
 * - `beginning` (Date | string): selected date for the transaction.
 * - `setBeginning` (function): setter for beginning date state.
 * - `error` (string): current validation error message.
 * - `setError` (function): setter for error state.
 * - `description` (string): current description text.
 * - `setDescription` (function): setter for description state.
 *
 * State:
 * - `showDatePicker` (boolean): controls visibility of the DatePicker modal.
 * - `showSetAmount` (boolean): controls visibility of the SetAmount modal.
 *
 * Notes:
 * - Inline styles are used for consistent styling across all input elements.
 * - Flexbox ensures that Amount and Date inputs remain side by side on larger screens and wrap on smaller screens.
 * - The component integrates with lifted state from a parent AddTransaction component.
 */


import { useState } from "react";
import DatePicker from "../DatePicker";
import SetAmount from "../SetAmount";

function AddTransactionExpenses({
  name,
  setName,
  amountValue,
  setAmountValue,
  beginning,
  setBeginning,
  error,
  setError,
  description,
  setDescription
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSetAmount, setShowSetAmount] = useState(false);

  const inputStyle = {
    padding: "10px",
    border: "none",
    borderBottom: "2px solid #ccc",
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const smallerInputStyle = { ...inputStyle, width: "200px" };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSetAmount, setShowSetAmount] = useState(false); // <-- modal state

  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>

      {/* Error */}
      {error && (
        <div style={{
          color: "#dc2626",
          background: "#fee2e2",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          {error}
        </div>
      )}

      {/* Name */}
      <input 
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={smallerInputStyle}
      />

      {/* Amount / Frequency */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <input
          readOnly
          placeholder="P"
          value={amountValue ? `P ${amountValue}` : ""}
          onClick={() => setShowSetAmount(true)} // <-- open modal
          style={{...inputStyle, width: "80px", textAlign: "center", cursor: "pointer"}}
        />
        <span>/</span>
        <input
          type="number"
          min={1}
          placeholder="1"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          style={{...inputStyle, width: "60px", textAlign: "center"}}
        />
        <select
          value={periodUnit}
          onChange={(e) => setPeriodUnit(e.target.value)}
          style={{...inputStyle, width: "100px", padding: "8px 0"}}
        >
          <option>Day</option>
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>

      {/* Beginning date */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "1rem" }}>beginning</span>
        <input
          readOnly
          placeholder="Select Date"
          value={beginning ? formatDate(beginning) : ""}
          onClick={() => setShowDatePicker(true)}
          style={{...smallerInputStyle, flex: "none"}}
        />
      </div>

      {showDatePicker && (
        <DatePicker
          selectedDate={beginning}
          onDateSelect={(dateStr) => setBeginning(dateStr)}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {/* SetAmount Modal */}
      {showSetAmount && (
        <SetAmount
          initialValue={amountValue || 0}
          title="Set Amount"
          onConfirm={(val) => setAmountValue(val)}
          onClose={() => setShowSetAmount(false)}
        />
      )}

    </div>
  );
}

export default ExpensesTransactions;
