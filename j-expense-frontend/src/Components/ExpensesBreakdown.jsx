// para makita expenses breakdown sa dashboard
function ExpensesBreakdown({ breakdown }) {
  const bgStyle = {
    width: "100%",
    minHeight: "200px",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    overflowY: "auto",
  };

  // If no breakdown data
  if (!breakdown || Object.keys(breakdown).length === 0) {
    return (
      <div style={bgStyle} className="d-flex justify-content-center align-items-center">
        <h1 style={{ margin: 0, fontSize: "1.2rem", color: "gray" }}>None</h1>
      </div>
    );
  }

  return (
    <div style={bgStyle}>
      {Object.entries(breakdown).map(([category, total], idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid #f1f1f1",
          }}
        >
          <span>{category}</span>
          <span style={{ color: "red", fontWeight: 600 }}>
            ₱ {Number(total ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ExpensesBreakdown;
