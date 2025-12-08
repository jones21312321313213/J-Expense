import { useState } from "react";
import DatePicker from "../DatePicker"; 
import SetAmount from "../setAmount"; // import the modal

function AddTransactionExpenses({
  onAdd, // 👈 new prop from context
  name,
  setName,
  amountValue,
  setAmountValue,
  frequency,
  setFrequency,
  periodUnit,
  setPeriodUnit,
  beginning,
  setBeginning,
  error,
  setError
}) {
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

  const smallerInputStyle = { ...inputStyle, width: "200px" };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSetAmount, setShowSetAmount] = useState(false); // <-- modal state

  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amountValue || !beginning) {
      setError("Please fill in all required fields.");
      return;
    }

    // 👇 Call context helper
    onAdd({
      type: "Expense",
      category: "Food", // you can make this dynamic later
      name,
      vendor: "Custom Vendor", // placeholder until you add vendor input
      amount: parseFloat(amountValue),
      date: beginning,
    });

    // Reset fields
    setName("");
    setAmountValue("");
    setFrequency(1);
    setPeriodUnit("Day");
    setBeginning("");
    setError("");
  };

  return (
    <form style={{ width: "100%", textAlign: "center" }} onSubmit={handleSubmit}>
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

      {/* Submit button */}
      <button
        type="submit"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#21c7b8",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Add Expense
      </button>
    </form>
  );
}

export default AddTransactionExpenses;
