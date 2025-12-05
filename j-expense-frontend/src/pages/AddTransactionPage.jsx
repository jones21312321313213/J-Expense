import SelectCategory from "../Components/Category/SelectCategory";
import AddTransaction from "../Components/Transactions/AddTransaction";

function AddTransactionPage() {

  const categoryContainerStyle = {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    background: "white",
    borderRadius: "20px",
    paddingTop: "15px",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 5px 12px rgba(0,0,0,0.08)",
  };

  const categoryScrollStyle = {
    width: "100%",
    overflowX: "auto",
    whiteSpace: "nowrap",
    padding: "10px 0",
  };

  const categoryTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
  };

  const addButtonStyle = {
    background: "#D9D9D9",
    border: "none",
    borderRadius: "10px",
    padding: "12px 25px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "30px",
    width: "350px",
    height: "80px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: "30px",
        padding: "20px",
      }}
    >
      {/* BACK ARROW */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
        <i className="bi-chevron-left" style={{ fontSize: "1.5rem", cursor: "pointer" }}></i>
      </div>

      {/* TITLE */}
      <h1 style={{ margin: 0, textAlign: "center" }}>Add Transaction</h1>

      {/* ADD TRANSACTION CONTAINER */}
      <AddTransaction />

      {/* CATEGORY SELECTION */}
      <h2 style={categoryTitleStyle}>Select a Category</h2>
      <div style={categoryContainerStyle}>
        <div style={categoryScrollStyle}>
          <SelectCategory />
        </div>
      </div>

      {/* ADD TRANSACTION BUTTON */}
      <button style={addButtonStyle}>
        Add Transaction
      </button>
    </div>
  );
}

export default AddTransactionPage;
