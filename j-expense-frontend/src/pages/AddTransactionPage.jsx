import SelectCategory from "../Components/Category/SelectCategory";
import AddTransaction from "../Components/Transactions/AddTransaction";
import { useTransactions } from "../context/TransactionsContext";
import { useGoals } from "../context/GoalsContext";

function AddTransactionPage() {
  const { addTransaction } = useTransactions();
  const { updateGoalProgress } = useGoals();

  // Wrapper: add transaction + update goal progress if linked
  const handleAddTransaction = (transaction) => {
    addTransaction(transaction);

    if (transaction.goalId) {
      const goalType = transaction.type === "income" ? "savings" : "expense";
      updateGoalProgress(transaction.goalId, transaction.amount, goalType);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: "30px",
      }}
    >
      {/* Pass wrapper down so AddTransaction can call it */}
      <AddTransaction onAdd={handleAddTransaction} />

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <SelectCategory />
      </div>
    </div>
  );
}

export default AddTransactionPage;
