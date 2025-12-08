/**
 * AddTransactionIncome.jsx
 * ------------------------
 * Component for adding an income transaction in the Add Transaction flow.
 *
 * Features:
 * - Input fields for:
 *   - Name of the income source.
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

function AddTransactionIncome({
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
    marginBottom: "20px",
    outline: "none",
    fontSize: "1rem",
    background: "transparent"
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      {/* Error */}
      {error && (
        <div
          style={{
            color: "#dc2626",
            background: "#fee2e2",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}
        >
          {error}
        </div>
      )}

      {/* Name */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ ...inputStyle, width: "100%" }}
      />

      {/* Amount + Date */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginBottom: "20px",
          width: "100%",
          flexWrap: "wrap"
        }}
      >
        {/* LEFT — Amount */}
        <div style={{ width: "48%", minWidth: "200px" }}>
          <label
            style={{
              display: "block",
              textAlign: "left",
              marginBottom: "6px",
              fontWeight: "600",
              fontSize: "0.95rem"
            }}
          >
            Amount
          </label>

          <input
            readOnly
            placeholder="₱"
            value={amountValue ? `₱ ${amountValue}` : ""}
            onClick={() => setShowSetAmount(true)}
            style={{
              padding: "10px",
              border: "none",
              borderBottom: "2px solid #ccc",
              width: "100%",
              textAlign: "center",
              background: "transparent",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          />
        </div>

        {/* RIGHT — Date */}
        <div style={{ width: "48%", minWidth: "200px" }}>
          <label
            style={{
              display: "block",
              textAlign: "left",
              marginBottom: "6px",
              fontWeight: "600",
              fontSize: "0.95rem"
            }}
          >
            Date
          </label>

          <input
            readOnly
            placeholder="Select Date"
            value={beginning ? formatDate(beginning) : ""}
            onClick={() => setShowDatePicker(true)}
            style={{
              padding: "10px",
              border: "none",
              borderBottom: "2px solid #ccc",
              width: "100%",
              textAlign: "center",
              background: "transparent",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div style={{ textAlign: "left", width: "100%", marginBottom: "12px" }}>
        <span style={{ fontSize: "1rem" }}>Description</span>
      </div>

      <textarea
        placeholder="Write a description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          minHeight: "100px",
          padding: "10px",
          borderRadius: "10px",
          border: "2px solid #ccc",
          outline: "none",
          resize: "vertical",
          fontSize: "1rem"
        }}
      />

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DatePicker
          selectedDate={beginning}
          onDateSelect={(dateStr) => {
            setBeginning(dateStr);
            setShowDatePicker(false);
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {/* Amount Modal */}
      {showSetAmount && (
        <SetAmount
          initialValue={amountValue || 0}
          title="Set Amount"
          onConfirm={(val) => {
            setAmountValue(val);
            setShowSetAmount(false);
          }}
          onClose={() => setShowSetAmount(false)}
        />
      )}
    </div>
  );
}

export default AddTransactionIncome