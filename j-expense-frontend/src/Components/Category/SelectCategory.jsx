import { useState, useEffect } from "react";
import CategoryTile from "./CategoryTile"; 
import { categoryService } from "../Services/CategoryService";
import foodBg from "../../assets/foodCategory.png";
import commuteBg from "../../assets/commuteCategory.png";
import entertainmentBg from "../../assets/entertainmentCategory.png";
import groceryBg from "../../assets/groceryCategory.png"; 
import shoppingBg from "../../assets/shoppingCategory.png";
import miscellaneousBg from "../../assets/miscellaneousCategory.png"; 
import add from "../../assets/addIcon.png";

function SelectCategory({ onSelect, selectedCategory, budgetType }) {
    const getUserId = () => localStorage.getItem("userId");
    const userId = getUserId();
    const [addClicked, setAddClicked] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [customCategories, setCustomCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

 


    // Default categories definition
    const defaultCategories = [
        { name: "Food", icon: foodBg, categoryType: "Expense" },
        { name: "Commute", icon: commuteBg, categoryType: "Expense" },
        { name: "Entertainment", icon: entertainmentBg, categoryType: "Expense" },
        { name: "Grocery", icon: groceryBg, categoryType: "Expense" },
        { name: "Shopping", icon: shoppingBg, categoryType: "Expense" },
        { name: "Miscellaneous", icon: miscellaneousBg, categoryType: "Expense" } 
    ];

    // Load categories from database on component mount
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            // STEP 1: Check session storage to bypass the heavy DB check on subsequent loads
            const hasInitialized = sessionStorage.getItem('categoriesInitialized');
            let needsDatabaseCheck = !hasInitialized;
            
            // 2. Fetch ALL existing categories
            const allCategories = await categoryService.getAllCategories();
            let finalCategories = allCategories;

            if (needsDatabaseCheck) {
                
                // 3. Identify which defaults are missing by comparing against existing DB entries
                const existingDefaultNames = allCategories
                    .filter(cat => (cat.isDefault || cat.is_default))
                    // CRITICAL: Use category_name to match backend response structure
                    .map(cat => cat.category_name); 

                const missingDefaults = defaultCategories.filter(
                    defaultCat => !existingDefaultNames.includes(defaultCat.name)
                );

                // 4. Create missing categories
                if (missingDefaults.length > 0) {
                    console.log(`Initializing database with ${missingDefaults.length} default categories...`);
                    
                    await Promise.all(missingDefaults.map(async (missingCat) => {
                        try {
                            await categoryService.createCategory({
                                name: missingCat.name,
                                icon: missingCat.icon,
                                isDefault: true, 
                                categoryType: missingCat.categoryType
                            });
                        } catch (error) {
                            // CRITICAL: Suppress "Category already exists" error. 
                            // This catch handles race conditions if multiple components try to initialize simultaneously.
                            if (error.message !== 'Category already exists') {
                                throw error;
                            }
                        }
                    }));
                    
                    // 5. Re-fetch the full list after initialization is complete
                    finalCategories = await categoryService.getAllCategories();
                }

                // 6. Set the session flag ONLY after initialization attempt is complete
                sessionStorage.setItem('categoriesInitialized', 'true');
            }

            // 7. Update component state with categories
            const custom = finalCategories.filter(cat => !(cat.isDefault || cat.is_default));
            setCustomCategories(custom);

        } catch (error) {
            console.error('Error loading or initializing categories:', error);
            // If fetching failed, ensure we remove the flag so it runs again on next mount
            sessionStorage.removeItem('categoriesInitialized');
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;

        // Determine the category type based on the budget flow passed from parent
        let categoryType;
        if (budgetType === "Savings Budget") {
            categoryType = "Savings";
        } else if (budgetType === "Expense Budget") {
            categoryType = "Expense";
        } else {
            categoryType = "Expense"; 
        }

        setIsLoading(true);
        try {
            // Save to database
            const savedCategory = await categoryService.createCategory({
                name: newCategoryName.trim(),
                categoryType: categoryType,
                ...(userId ? { userID: userId } : {})
            });

            // Update local state 
            setCustomCategories(prev => [...prev, savedCategory]);
            
            // Select the newly added category (using category_name returned by API)
            onSelect(savedCategory.category_name); 
            
            // Reset input
            setNewCategoryName("");
            setAddClicked(false);
        } catch (error) {
            if (error.message === 'Category already exists') {
                alert('This category already exists!');
            } else {
                alert('Failed to add category. Please try again.');
            }
            console.error('Error adding category:', error);
        } finally {
            setIsLoading(false);
        }
    };

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
                {/* Default Categories */}
                {defaultCategories.map(cat => (
                    <CategoryTile
                        key={cat.name}
                        name={cat.name}
                        icon={cat.icon}
                        bgColor={selectedCategory === cat.name ? '#bdbdbd' : '#D9D9D9'}
                        onClick={() => onSelect(cat.name)}
                    />
                ))}

                {/* Custom Categories from Database */}
                {customCategories.map(cat => (
                    <CategoryTile
                        key={cat.categoryID}
                        name={cat.category_name} 
                        icon={cat.iconPath || cat.icon_path || miscellaneousBg} 
                        bgColor={selectedCategory === cat.category_name ? '#bdbdbd' : '#D9D9D9'}
                        onClick={() => onSelect(cat.category_name)}
                    />
                ))}

                {/* Add Button */}
                <CategoryTile
                    name="Add"
                    icon={add}
                    bgColor="#D9D9D9"
                    onClick={() => setAddClicked(!addClicked)}
                />
            </div>

            {/* Add Category Input */}
            {addClicked && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <input
                        type="text"
                        placeholder="New category name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                        disabled={isLoading}
                        style={{
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            marginRight: "10px"
                        }}
                    />
                    <button
                        onClick={handleAddCategory}
                        disabled={isLoading}
                        style={{
                            padding: "10px 14px",
                            borderRadius: "6px",
                            border: "none",
                            background: isLoading ? '#ccc' : '#ddd',
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isLoading ? 'Adding...' : 'Add'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default SelectCategory;