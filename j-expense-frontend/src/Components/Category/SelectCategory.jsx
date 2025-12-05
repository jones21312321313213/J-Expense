/**
 * SelectCategory Component
 * ------------------------
 * This component renders a horizontal scrollable row of predefined category tiles and allows the user
 * to select one. It also supports adding a new custom category dynamically.
 * 
 * Props:
 * - `onSelect` (function): Callback triggered when a category is selected, passing the category name.
 * - `selectedCategory` (string): The currently selected category. Used to highlight the active tile.
 * 
 * Features:
 * 1. Predefined categories with icons and dynamic background highlighting when selected.
 * 2. "Add" tile that toggles an input field to create a new custom category.
 * 3. Horizontal scrolling for the category row to handle overflow.
 * 4. New categories can be added by typing a name and clicking "Add", which calls the `onSelect` callback.
 * 
 * Styling:
 * - Flexbox row with gap and horizontal overflow.
 * - Input and button for adding a new category are centered below the tiles.
 */


import { useState } from "react";
import CategoryTile from "./CategoryTile"; 
import foodBg from "../../assets/foodCategory.png";
import commuteBg from "../../assets/commuteCategory.png";
import entertainmentBg from "../../assets/entertainmentCategory.png";
import groceryBg from "../../assets/groceryCategory.png"; 
import shoppingBg from "../../assets/shoppingCategory.png";
import miscellaneousBg from "../../assets/miscellaneousCategory.png"; 
import add from "../../assets/addIcon.png";

function SelectCategory({ onSelect, selectedCategory }) {
    const [addClicked, setAddClicked] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    return (
        <div>

            {/* HORIZONTAL SCROLL ROW */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    overflowX: "auto",
                    paddingBottom: "10px",
                    whiteSpace: "nowrap"
                }}
            >
                <CategoryTile name="Food" icon={foodBg} bgColor={selectedCategory === 'Food' ? '#bdbdbd' : '#D9D9D9'} onClick={() => onSelect('Food')} />
                <CategoryTile name="Commute" icon={commuteBg} bgColor={selectedCategory === 'Commute' ? '#bdbdbd' : '#D9D9D9'} onClick={() => onSelect('Commute')} />
                <CategoryTile name="Entertainment" icon={entertainmentBg} bgColor={selectedCategory === 'Entertainment' ? '#bdbdbd' : '#D9D9D9'} onClick={() => onSelect('Entertainment')} />
                <CategoryTile name="Grocery" icon={groceryBg} bgColor={selectedCategory === 'Grocery' ? '#bdbdbd' : '#D9D9D9'} onClick={() => onSelect('Grocery')} />
                <CategoryTile name="Shopping" icon={shoppingBg} bgColor={selectedCategory === 'Shopping' ? '#bdbdbd' : '#D9D9D9'} onClick={() => onSelect('Shopping')} />
                <CategoryTile name="Miscellaneous" icon={miscellaneousBg} bgColor={selectedCategory === 'Miscellaneous' ? '#bdbdbd' : '#D9D9D9'} onClick={() => onSelect('Miscellaneous')} />

                <CategoryTile
                    name="Add"
                    icon={add}
                    bgColor="#D9D9D9"
                    onClick={() => setAddClicked(!addClicked)}
                />
            </div>

            {addClicked && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <input
                        type="text"
                        placeholder="New category name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        style={{
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            marginRight: "10px"
                        }}
                    />
                    <button
                        onClick={() => {
                            if (newCategoryName.trim()) {
                                onSelect(newCategoryName.trim());
                                setNewCategoryName("");
                                setAddClicked(false);
                            }
                        }}
                        style={{
                            padding: "10px 14px",
                            borderRadius: "6px",
                            border: "none",
                            background: "#ddd",
                            cursor: "pointer"
                        }}
                    >
                        Add
                    </button>
                </div>
            )}
        </div>
    );
}

export default SelectCategory;
