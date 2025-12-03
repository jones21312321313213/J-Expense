import { useState } from "react";
import CategoryTile from "./CategoryTile";
import foodBg from "../../assets/foodCategory.png";
import commuteBg from "../../assets/commuteCategory.png";
import entertainmentBg from "../../assets/entertainmentCategory.png";
import groceryBg from "../../assets/groceryCategory.png";
import shoppingBg  from "../../assets/shoppingCategory.png";
import miscellaneousBg  from "../../assets/miscellaneousCategory.png";
import add  from "../../assets/addIcon.png";
function SelectCategory() {
    const [addClicked, setAddClicked] = useState(false);

    const handleAddClick = () => {
        setAddClicked(!addClicked); // toggle clicked state
    };

    return (
        <div
            className="container"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // 👈 align header & tiles to left
                padding: "20px",
            }}
        >
            <h1 style={{ marginBottom: "20px" }}>Select Category</h1>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                }}
            >
                <CategoryTile name="Food" icon={foodBg} bgColor="#D9D9D9" />
                <CategoryTile name="Commute" icon={commuteBg} bgColor="#D9D9D9" />
                <CategoryTile name="Entertainment" icon={entertainmentBg} bgColor="#D9D9D9" />
                <CategoryTile name="Grocery" icon={groceryBg} bgColor="#D9D9D9" />
                <CategoryTile name="Shopping" icon={shoppingBg} bgColor="#D9D9D9" />
                <CategoryTile name="Miscellaneous" icon={miscellaneousBg} bgColor="#D9D9D9" />

                {/* Add Button as a CategoryTile */}
                <CategoryTile
                    name="Add"
                    bgColor={addClicked ? "#a0e0a0" : "#D9D9D9"}
                    icon={add} // or you can pass a "+" icon image
                    textColor="black"
                    onClick={handleAddClick} // for later
                />
            </div>
        </div>
    );
}

export default SelectCategory;
