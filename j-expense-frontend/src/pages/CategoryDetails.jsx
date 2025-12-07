import foodBg from "../assets/foodCategory.png";
import commuteBg from "../assets/commuteCategory.png";
import entertainmentBg from "../assets/entertainmentCategory.png";
import groceryBg from "../assets/groceryCategory.png"; 
import shoppingBg from "../assets/shoppingCategory.png";
import CategoryCard from "../Components/Category/CategoryCard";

function CategoryDetails() {

    const containerStyle = {
        width: "100%",
        padding: "20px",
        margin: "0 auto",
        boxSizing: "border-box",
    };

    const headerStyle = {
        fontSize: "24px",
        fontWeight: "700",
        marginBottom: "20px",
        color: "#333",
        textAlign: "center",
    };

    const categoryListStyle = {
        width: "100%",
        maxHeight: "calc(100vh - 150px)",
        overflowY: "auto",
        paddingRight: "8px",
        boxSizing: "border-box",
        scrollbarWidth: "none",        // Firefox
        msOverflowStyle: "none",       // IE/Edge
    };


    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Edit Category</h1>

            <div style={categoryListStyle}>
                <style>
                    {`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}
                </style>

                <CategoryCard icon={foodBg} name="Food" type="Expense" />
                <CategoryCard icon={commuteBg} name="Transportation" type="Expense" />
                <CategoryCard icon={entertainmentBg} name="Entertainment" type="Expense" />
                <CategoryCard icon={groceryBg} name="Grocery" type="Expense" />
                <CategoryCard icon={shoppingBg} name="Shopping" type="Expense" />

                <CategoryCard icon={foodBg} name="Utilities" type="Expense" />
                <CategoryCard icon={commuteBg} name="Rent" type="Expense" />
                <CategoryCard icon={entertainmentBg} name="Savings" type="Income" />
                <CategoryCard icon={groceryBg} name="Freelance" type="Income" />
                <CategoryCard icon={shoppingBg} name="Insurance" type="Expense" />
                <CategoryCard icon={foodBg} name="Loans" type="Expense" />
            </div>

        </div>
    );
}

export default CategoryDetails;
