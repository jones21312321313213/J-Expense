/**
 * para rani sa mga transaction na repetitive ig
 * pwede pa guro ta mo add og 1 more transaction type which is subscriptions ig
 * dunno how do we identify bills from transactions or repetitive transactions = bills
 */

import React from "react";

function Bills() {
  const billsData = [
    {
      dueDate: "2025-12-01",
      item: "Electricity",
      description: "Monthly electricity bill",
      lastCharge: "2025-11-28",
      amount: "₱1,200",
    },
    {
      dueDate: "2025-12-03",
      item: "Water",
      description: "Monthly water bill",
      lastCharge: "2025-11-30",
      amount: "₱300",
    },
    {
      dueDate: "2025-12-05",
      item: "Internet",
      description: "Fiber internet subscription",
      lastCharge: "2025-12-01",
      amount: "₱1,500",
    },
    {
      dueDate: "2025-12-10",
      item: "Trash",
      description: "Garbage collection fee",
      lastCharge: "2025-12-05",
      amount: "₱150",
    },
    {
      dueDate: "2025-12-15",
      item: "Gas",
      description: "Household cooking gas",
      lastCharge: "2025-12-10",
      amount: "₱600",
    },
  ];

  const containerStyle = {
    background: "#f8f9fa",
    borderRadius: "20px",
    padding: "20px",
    width: "95%",
    maxWidth: "1200px",
    margin: "0 auto",
    height: "100%",
    overflowY: "auto",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    padding: "12px",
    textAlign: "left",
    color: "#495057",
    fontWeight: "600",
  };

  const tdStyle = {
    padding: "12px",
    color: "#495057",
  };

  const amountStyle = {
    ...tdStyle,
    color: "#dc2626", // red color for amount
    fontWeight: "600",
  };

  return (
    <div style={{ padding: "20px", height: "80%" }}>
      {/* Title outside the container */}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Bills</h1>

      <div style={containerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Due Date</th>
              <th style={thStyle}>Item</th>
              <th style={thStyle}>Item Description</th>
              <th style={thStyle}>Last Date Charged</th>
              <th style={thStyle}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {billsData.map((bill, index) => (
              <tr key={index}>
                <td style={tdStyle}>{bill.dueDate}</td>
                <td style={tdStyle}>{bill.item}</td>
                <td style={tdStyle}>{bill.description}</td>
                <td style={tdStyle}>{bill.lastCharge}</td>
                <td style={amountStyle}>{bill.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bills;
