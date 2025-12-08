import { useState } from "react";

function AddTransactionDefault({ onAdd }) {
  const [formData, setFormData] = useState({
    type: "Expense",     // default type, can be changed later
    category: "Miscellaneous",
    name: "",
    vendor: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.amount || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }

    // 👇 Call context helper
    onAdd({
      ...formData,
      amount: parseFloat(formData.amount),
    });

    // Reset form
    setFormData({
      type: "Expense",
      category: "Miscellaneous",
      name: "",
      vendor: "",
      amount: "",
      date: "",
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
      <h3>Add Default Transaction</h3>

      <label>
        Type:
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
      </label>

      <label>
        Category:
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>

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
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
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
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransactionDefault;
