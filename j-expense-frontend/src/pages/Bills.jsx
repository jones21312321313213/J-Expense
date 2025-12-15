import React, { useEffect, useState } from "react";
import { billService } from "../Components/Services/BillService";
import { FaTrash } from "react-icons/fa";
import BillReminderDeleteModal from "../Components/Bill/BillReminderDeleteModal";

function Bills() {
  const [bills, setBills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBillID, setSelectedBillID] = useState(null);
  const [newBill, setNewBill] = useState({
    billName: "",
    amount: 0,
    dueDate: "",
    status: false,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [billToDelete, setBillToDelete] = useState(null);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const data = await billService.getBills();
      setBills(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBill((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddOrEditBill = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await billService.updateBill(selectedBillID, newBill);
      } else {
        await billService.createBill(newBill);
      }
      setShowModal(false);
      setIsEditing(false);
      setSelectedBillID(null);
      setNewBill({ billName: "", amount: 0, dueDate: "", status: false });
      fetchBills();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRowClick = (bill) => {
    setIsEditing(true);
    setSelectedBillID(bill.id);
    setNewBill({
      billName: bill.name,
      amount: bill.amount,
      dueDate: bill.dueDate ? bill.dueDate.split("T")[0] : "",
      status: bill.status,
    });
    setShowModal(true);
  };

  const handleDeleteClick = (bill) => {
    setBillToDelete(bill);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await billService.deleteBill(billToDelete.id);
      setDeleteModalOpen(false);
      setBillToDelete(null);
      fetchBills();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", height: "100%" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Bills</h1>

      {/* Add Bill Button */}
      <div style={{ marginBottom: "10px", textAlign: "right" }}>
        <button
          onClick={() => {
            setIsEditing(false);
            setNewBill({ billName: "", amount: 0, dueDate: "", status: false });
            setShowModal(true);
          }}
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            padding: "5px 12px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>

      {/* Bills Table */}
      <div
        style={{
          overflowY: "auto",
          height: "75vh",
          background: "#f8f9fa",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "12px", textAlign: "left" }}>Due Date</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Bill Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Amount</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "12px", textAlign: "center" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr
                key={bill.id}
                onClick={() => handleRowClick(bill)}
                style={{ cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "12px" }}>
                  {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : "-"}
                </td>
                <td style={{ padding: "12px" }}>{bill.name}</td>
                <td style={{ padding: "12px", color: "#dc2626", fontWeight: "600" }}>
                  ₱{bill.amount.toLocaleString()}
                </td>
                <td style={{ padding: "12px" }}>{bill.status ? "Paid" : "Pending"}</td>
                <td
                  style={{ padding: "12px", textAlign: "center" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(bill);
                  }}
                >
                  <FaTrash color="#dc2626" style={{ cursor: "pointer" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "30px 25px",
              borderRadius: "16px",
              width: "400px",
              maxWidth: "90%",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                fontSize: "24px",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {isEditing ? "Edit Bill" : "Add New Bill"}
            </h2>
            <form onSubmit={handleAddOrEditBill}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#374151" }}>
                  Bill Name
                </label>
                <input
                  type="text"
                  name="billName"
                  value={newBill.billName}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", outline: "none" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#374151" }}>
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={newBill.amount}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", outline: "none" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#374151" }}>
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={newBill.dueDate}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", gap: "10px" }}>
                <input type="checkbox" name="status" checked={newBill.status} onChange={handleInputChange} id="status" style={{ width: "18px", height: "18px" }} />
                <label htmlFor="status" style={{ fontWeight: "500", color: "#374151" }}>Paid</label>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #d1d5db", background: "#f3f4f6", color: "#374151", fontWeight: "500", cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "#6366f1", color: "#fff", fontWeight: "500", cursor: "pointer" }}>
                  {isEditing ? "Update Bill" : "Add Bill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && billToDelete && (
        <BillReminderDeleteModal
          billName={billToDelete.name}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
}

export default Bills;
