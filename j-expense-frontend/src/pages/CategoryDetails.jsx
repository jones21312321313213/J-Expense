import foodBg from "../assets/foodCategory.png";
import commuteBg from "../assets/commuteCategory.png";
import entertainmentBg from "../assets/entertainmentCategory.png";
import groceryBg from "../assets/groceryCategory.png"; 
import shoppingBg from "../assets/shoppingCategory.png";
import CategoryCard from "../Components/Category/CategoryCard";
import DeleteCategory from "../Components/Category/DeleteCategory";
import { useState } from "react";

function CategoryDetails() {

    //  Move categories into state so we can delete them temporarily
    const [categories, setCategories] = useState([
        { icon: foodBg, name: "Food", type: "Expense" },
        { icon: commuteBg, name: "Transportation", type: "Expense" },
        { icon: entertainmentBg, name: "Entertainment", type: "Expense" },
        { icon: groceryBg, name: "Grocery", type: "Expense" },
        { icon: shoppingBg, name: "Shopping", type: "Expense" },

        { icon: foodBg, name: "Utilities", type: "Expense" },
        { icon: commuteBg, name: "Rent", type: "Expense" },
        { icon: entertainmentBg, name: "Savings", type: "Income" },
        { icon: groceryBg, name: "Freelance", type: "Income" },
        { icon: shoppingBg, name: "Insurance", type: "Expense" },
        { icon: foodBg, name: "Loans", type: "Expense" },
    ]);

    const [showDelete, setShowDelete] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleOpenDelete = (category) => {
        setSelectedCategory(category);
        setShowDelete(true);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setSelectedCategory(null);
    };

    // 2️⃣ The temporary delete function
    const handleConfirmDelete = () => {
        setCategories(prev =>
            prev.filter(cat => cat.name !== selectedCategory.name)
        );
        handleCloseDelete();
    };

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
        scrollbarWidth: "none",
        msOverflowStyle: "none",
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Edit Category</h1>

            <div style={categoryListStyle}>
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>

                {/* 3️⃣ Render categories from state */}
                {categories.map((cat, index) => (
                    <CategoryCard
                        key={index}
                        icon={cat.icon}
                        name={cat.name}
                        type={cat.type}
                        onDelete={() => handleOpenDelete(cat)}
                    />
                ))}

            </div>

            {/* 4️⃣ Pass our delete function into the modal */}
            {showDelete && (
                <DeleteCategory 
                    name={selectedCategory?.name}
                    onClose={handleCloseDelete}
                    onDelete={handleConfirmDelete}
                />
            )}

        </div>
    );
}

export default CategoryDetails;
