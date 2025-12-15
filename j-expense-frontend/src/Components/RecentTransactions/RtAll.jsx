import { useEffect, useState } from "react";
import { transactionService } from '../Services/TransactionsService';
import TransactionCard from "./TransactionCard";

function RtAll({ typeFilter }) { // accept typeFilter prop
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await transactionService.getTransactionsByUser();

        // Apply type filter if provided
        const filteredData = typeFilter
          ? data.filter(t => t.type.toLowerCase() === typeFilter.toLowerCase())
          : data;

        setTransactions(filteredData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [typeFilter]); // re-run if typeFilter changes

  return (
    <div
      style={{
        height: "705px",
        backgroundColor: "white",
        marginTop: "-20px",
        borderRadius: "10px",
        overflowY: "auto",
        padding: "10px"
      }}
    >
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {!loading && transactions.length === 0 && (
        <p style={{ textAlign: "center", color: "gray" }}>No transactions</p>
      )}
      {!loading && transactions.length > 0 &&
        transactions.map((t) => (
          <TransactionCard
            key={t.id}
            title={t.item}
            category={t.categoryName}
            amount={t.amount}
            date={t.date}
            iconName={getIconName(t.type, t.categoryName)}
          />
        ))
      }
    </div>
  );
}

// Helper function for icons
const getIconName = (type, category) => {
  if (type === "income") return "bi-arrow-up-circle-fill";
  if (type === "expense") return "bi-arrow-down-circle-fill";
  if (type.toLowerCase() === "goal") return "bi-handbag-fill";
  if (type.toLowerCase() === "budget") return "bi-piggy-bank-fill";
  return "bi-bag";
};

export default RtAll;
