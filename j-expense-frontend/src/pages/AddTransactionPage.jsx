import SelectCategory from "../Components/Category/SelectCategory";
import AddTransaction from "../Components/Transactions/AddTransaction";

function AddTransactionPage() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",   // <-- Centers horizontally
                width: "100%",
                gap: "30px"
            }}
        >
            <AddTransaction />

            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <SelectCategory />
            </div>
        </div>
    );
}

export default AddTransactionPage;
