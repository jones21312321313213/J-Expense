// src/pages/Bills.jsx
import React from "react";

function Bills() {
  const bills = [
    {
      dueDate: "25 June 2025",
      item: "Figma - Monthly",
      description: "A monthly subscription of Figma",
      lastCharged: "25 May 2025",
      amount: "₱ 4,000",
    },
    {
      dueDate: "17 June 2024",
      item: "Adobe - Yearly",
      description: "A yearly subscription of Adobe",
      lastCharged: "17 June 2023",
      amount: "₱ 4,000",
    },
    {
      dueDate: "17 June 2024",
      item: "Spotify - Monthly",
      description: "A monthly subscription of Spotify",
      lastCharged: "17 June 2024",
      amount: "₱ 1,202",
    },
  ];

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Bills</h2>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          }}
        >
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th style={thStyle}>Due Date</th>
              <th style={thStyle}>Item</th>
              <th style={thStyle}>Item Description</th>
              <th style={thStyle}>Last Date Charged</th>
              <th style={thStyle}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index}>
                <td style={tdStyle}>{bill.dueDate}</td>
                <td style={tdStyle}>{bill.item}</td>
                <td style={tdStyle}>{bill.description}</td>
                <td style={tdStyle}>{bill.lastCharged}</td>
                <td style={tdStyle}>{bill.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px 16px",
  fontWeight: "600",
  fontSize: "0.95rem",
  borderBottom: "1px solid #dee2e6",
};

const tdStyle = {
  padding: "12px 16px",
  fontSize: "0.9rem",
  borderBottom: "1px solid #f1f1f1",
  color: "#212529",
};

export default Bills;
