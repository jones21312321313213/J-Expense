// para makita all recent transactions sa dashboard 
function RtAll({ transactions }) {
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
          <span style={{ fontSize: "1.5rem", color: "gray" }}>None - ALL</span>
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
            <span
              style={{
                color: tx.type === "Income" ? "green" : "red",
                fontWeight: 600,
              }}
            >
              ₱ {Number(tx.amount ?? 0).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  
  export default RtAll;
  