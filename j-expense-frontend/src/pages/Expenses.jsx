import Statistics from "../Components/Statistics";
import { useTransactions } from "../context/TransactionsContext";

function Expenses() {
  const { transactions } = useTransactions();

  // Define categories you want to group by
  const categories = ["Food", "Transportation", "Shopping", "Entertainment", "Grocery", "Miscellaneous"];

  // Group transactions by category
  const groupedExpenses = categories.map((cat) => {
    const filtered = transactions.filter((tx) => tx.type === "Expense" && tx.category === cat);
    const total = filtered.reduce((sum, tx) => sum + tx.amount, 0);

    return {
      name: cat,
      amount: `₱ ${total.toLocaleString()}`,
      change: "0%", // placeholder until you calculate week-over-week
      transactions: filtered.map((tx) => ({
        name: tx.name,
        vendor: tx.vendor,
        amount: `₱ ${tx.amount.toLocaleString()}`,
        // Display-friendly date (MMM DD, YYYY)
        date: new Date(tx.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
      })),
    };
  });

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      {/* Chart Section */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "10px" }}>Expenses Comparison</h2>
        <Statistics />
      </div>

      {/* Breakdown Section */}
      <div>
        <h2 style={{ marginBottom: "20px" }}>Expenses Breakdown</h2>

        {groupedExpenses.map((cat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              border: "1px solid #f1f1f1",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0 }}>{cat.name}</h3>
              <span style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                {cat.amount} ({cat.change})
              </span>
            </div>

            {cat.transactions.length > 0 ? (
              <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
                {cat.transactions.map((tx, i) => (
                  <li
                    key={i}
                    style={{
                      padding: "10px 0",
                      borderBottom: "1px solid #f1f1f1",
                      fontSize: "0.9rem",
                    }}
                  >
                    <strong>{tx.name}</strong> ({tx.vendor}), {tx.amount} on {tx.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: "0.9rem", color: "#6c757d", margin: 0 }}>None</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Expenses;
