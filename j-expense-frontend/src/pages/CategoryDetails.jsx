import foodBg from "../assets/foodCategory.png";
import commuteBg from "../assets/commuteCategory.png";
import entertainmentBg from "../assets/entertainmentCategory.png";
import groceryBg from "../assets/groceryCategory.png"; 
import shoppingBg from "../assets/shoppingCategory.png";
import CategoryCard from "../Components/Category/CategoryCard";
import DeleteCategory from "../Components/Category/DeleteCategory";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../Components/Services/CategoryService";
import miscellaneousBg from "../assets/miscellaneousCategory.png";

function CategoryDetails() {

    // categories state is populated from the backend
    const [categories, setCategories] = useState([]);

    const [showDelete, setShowDelete] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Load categories from backend on mount
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setIsLoading(true);
                const list = await categoryService.getAllCategories();
                if (!mounted) return;
                // Map to UI-friendly shape
                const mapped = list.map(cat => ({
                    categoryID: cat.categoryID || cat.category_id || cat.categoryId,
                    name: cat.category_name || cat.name,
                    type: cat.category_type || cat.categoryType || 'Expense',
                    isDefault: Boolean(cat.is_global || cat.isDefault || cat.is_default),
                    icon: cat.iconPath || cat.icon_path || getIconFor(cat.category_name || cat.name)
                }));
                setCategories(mapped);

                // If we were signalled to refresh, clear the flag
                if (sessionStorage.getItem('categoriesNeedRefresh') === 'true') {
                    sessionStorage.removeItem('categoriesNeedRefresh');
                }
            } catch (err) {
                console.error('Failed to load categories:', err);
            } finally {
                setIsLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const handleOpenDelete = (category) => {
        setSelectedCategory(category);
        setShowDelete(true);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setSelectedCategory(null);
    };

    // 2️⃣ The temporary delete function
    const handleConfirmDelete = async () => {
        // Attempt to delete via API if we have an id
        try {
            if (selectedCategory && selectedCategory.categoryID) {
                await categoryService.deleteCategory(selectedCategory.categoryID);
            }
            setCategories(prev => prev.filter(cat => cat.categoryID !== selectedCategory.categoryID));
            handleCloseDelete();
        } catch (err) {
            console.error('Failed to delete category:', err);
            if (err.message && err.message.includes('status: 403')) {
                alert('Cannot delete default category or you are not authorized to delete this category.');
            } else {
                alert('Failed to delete category. Please try again.');
            }
            handleCloseDelete();
        }
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

    // Resolve icon for a given category name
    const getIconFor = (name) => {
        const normalized = (name || '').toLowerCase();
        if (normalized.includes('food')) return foodBg;
        if (normalized.includes('commut') || normalized.includes('transport')) return commuteBg;
        if (normalized.includes('entertain')) return entertainmentBg;
        if (normalized.includes('grocery')) return groceryBg;
        if (normalized.includes('shop')) return shoppingBg;
        return miscellaneousBg;
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Edit Category</h1>

            <div style={categoryListStyle}>
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>

                {/* 3️⃣ Render categories from state */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '30px' }}>Loading categories...</div>
                ) : categories.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px', color: '#666' }}>No categories yet.</div>
                ) : (
                    categories.map((cat) => (
                        <CategoryCard
                            key={cat.categoryID}
                            id={cat.categoryID}
                            icon={cat.icon}
                            name={cat.name}
                            type={cat.type}
                            isDefault={cat.isDefault}
                            onDelete={!cat.isDefault ? () => handleOpenDelete(cat) : undefined}
                            onClick={() => {
                                // navigate to edit page with full payload — use path param for robustness
                                navigate(`../edit-category/${cat.categoryID}`, { state: {
                                    id: cat.categoryID,
                                    name: cat.name,
                                    type: cat.type,
                                    isDefault: cat.isDefault,
                                    icon: cat.icon
                                } });
                            }}
                        />
                    ))
                )}

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
