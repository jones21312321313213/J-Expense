// para makita expenses recent transactions sa dashboard 
function RtExpenses({ transactions }) {
    if (!transactions || transactions.length === 0) {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "705px",
            backgroundColor: "white",
            marginTop: "-20px",
            borderRadius: "10px",
          }}
        >
          <span style={{ fontSize: "1.5rem", color: "gray" }}>None - Expenses</span>
        </div>
      );
    }
  
    return (
      <div
        style={{
          backgroundColor: "white",
          marginTop: "-20px",
          borderRadius: "10px",
          padding: "20px",
          height: "705px",
          overflowY: "auto",
        }}
      >
        {transactions.map((tx, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #f1f1f1",
            }}
          >
            <span>{tx.name}</span>
            <span>
              {tx.date
                ? new Date(tx.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "No date"}
            </span>
            <span style={{ color: "red", fontWeight: 600 }}>
              ₱ {Number(tx.amount ?? 0).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  
  export default RtExpenses;
  