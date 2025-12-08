import { useState } from "react";

function AddTransactionRepetitive({ onAdd }) {
  const [formData, setFormData] = useState({
    type: "Expense",       // default, you can make this selectable
    category: "Miscellaneous",
    name: "",
    vendor: "",
    amount: "",
    frequency: 1,
    periodUnit: "Month",   // e.g. every 1 Month
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.amount || !formData.startDate) {
      alert("Please fill in all required fields.");
      return;
    }

    // 👇 Call context helper
    onAdd({
      type: formData.type,
      category: formData.category,
      name: formData.name,
      vendor: formData.vendor,
      amount: parseFloat(formData.amount),
      date: formData.startDate,
      frequency: formData.frequency,
      periodUnit: formData.periodUnit,
    });

    // Reset form
    setFormData({
      type: "Expense",
      category: "Miscellaneous",
      name: "",
      vendor: "",
      amount: "",
      frequency: 1,
      periodUnit: "Month",
      startDate: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <h3>Add Repetitive Transaction</h3>

      <label>
        Name:
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>

      <label>
        Vendor:
        <input
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>

      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>

      <label>
        Frequency:
        <input
          type="number"
          name="frequency"
          min="1"
          value={formData.frequency}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>

      <label>
        Period Unit:
        <select
          name="periodUnit"
          value={formData.periodUnit}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option>Day</option>
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </label>

      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>

      <button
        type="submit"
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          background: "#21c7b8",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Add Repetitive Transaction
      </button>
    </form>
  );
}

export default AddTransactionRepetitive;
