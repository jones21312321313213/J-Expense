import { useState } from "react";
import CategoryTile from "./CategoryTile";
import DatePicker from "../DatePicker";
import foodBg from "../../assets/foodCategory.png";
import commuteBg from "../../assets/commuteCategory.png";
import entertainmentBg from "../../assets/entertainmentCategory.png";
import groceryBg from "../../assets/groceryCategory.png";
import shoppingBg  from "../../assets/shoppingCategory.png";
import miscellaneousBg  from "../../assets/miscellaneousCategory.png";
import add  from "../../assets/addIcon.png";

function SelectCategory({ onSelect, selectedCategory, amountValue, onRequestSetAmount, onSave, onClose }) {
    const [addClicked, setAddClicked] = useState(false);
    const [name, setName] = useState("");
    const [frequency, setFrequency] = useState(1);
    const [beginning, setBeginning] = useState(() => {
        const t = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[t.getMonth()]} ${t.getDate()}`;
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [error, setError] = useState("");

    const handleAddClick = () => {
        setAddClicked(!addClicked);
    };

    const handleDateSelect = (date) => {
        setBeginning(date);
        setShowDatePicker(false);
    };

    const handleSaveClick = () => {
        let errorMsg = "";
        if (!name.trim()) {
            errorMsg = "Name is required";
        } else if (!amountValue || amountValue === 0) {
            errorMsg = "Amount is required";
        } else if (!selectedCategory) {
            errorMsg = "Category is required";
        }
        
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        // Clear error and save
        setError("");
        onSave && onSave({ name, frequency, beginning });
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "40px",
                    background: "linear-gradient(to right, #a8d8ea 0%, #f5e6d3 100%)",
                    borderRadius: "20px",
                    maxWidth: "800px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    position: "relative"
                }}
            >
                {/* Close button */}
                <button
                    onClick={() => onClose && onClose()}
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        background: "none",
                        border: "none",
                        fontSize: "2rem",
                        cursor: "pointer",
                        padding: "0",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    ×
                </button>

                {/* Error Message */}
                {error && (
                    <div style={{
                        color: "#dc2626",
                        fontSize: "1rem",
                        fontWeight: "600",
                        marginBottom: "20px",
                        textAlign: "center",
                        padding: "10px",
                        background: "#fee2e2",
                        borderRadius: "8px",
                        width: "100%"
                    }}>
                        {error}
                    </div>
                )}
                <div style={{ 
                    textAlign: "center", 
                    marginBottom: "40px",
                    width: "100%"
                }}>
                    <input 
                        type="text" 
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            border: "none",
                            borderBottom: "2px solid #333",
                            background: "transparent",
                            padding: "8px",
                            textAlign: "center",
                            fontSize: "1rem",
                            marginBottom: "20px",
                            width: "200px",
                            outline: "none"
                        }}
                    />
                    
                    <div style={{ 
                        display: "flex", 
                        gap: "10px", 
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                        fontSize: "1.1rem"
                    }}>
                        <input 
                            type="text" 
                            value={amountValue ? `P ${amountValue}` : "P 0"}
                            readOnly
                            onClick={() => onRequestSetAmount && onRequestSetAmount()}
                            onFocus={() => onRequestSetAmount && onRequestSetAmount()}
                            style={{
                                border: "none",
                                borderBottom: "2px solid #333",
                                background: "transparent",
                                padding: "8px",
                                textAlign: "center",
                                width: "80px",
                                fontSize: "1rem",
                                outline: "none",
                                cursor: "pointer"
                            }}
                        />
                        <span>/</span>
                        <input 
                            type="number" 
                            value={frequency}
                            min={1}
                            onChange={(e) => setFrequency(Number(e.target.value))}
                            style={{
                                border: "none",
                                borderBottom: "2px solid #333",
                                background: "transparent",
                                padding: "8px",
                                textAlign: "center",
                                width: "60px",
                                fontSize: "1rem",
                                outline: "none"
                            }}
                        />
                        <span>month</span>
                    </div>
                    
                    <div style={{ fontSize: "1rem" }}>
                        <span>beginning </span>
                        <input 
                            type="text" 
                            value={beginning}
                            readOnly
                            onClick={() => setShowDatePicker(true)}
                            style={{
                                border: "none",
                                borderBottom: "2px solid #333",
                                background: "transparent",
                                padding: "8px",
                                textAlign: "center",
                                fontSize: "1rem",
                                width: "150px",
                                outline: "none",
                                cursor: "pointer"
                            }}
                        />
                    </div>
                </div>

                {/* Select category section */}
                <div style={{ 
                    width: "100%"
                }}>
                    <h2 style={{ 
                        marginBottom: "30px",
                        fontSize: "1.8rem",
                        fontWeight: "normal",
                        textAlign: "left",
                        marginLeft: "10px"
                    }}>
                        Select category
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "20px",
                            marginBottom: "40px",
                            justifyItems: "center"
                        }}
                    >
                        <CategoryTile name="Food" icon={foodBg} bgColor={selectedCategory === 'Food' ? '#bdbdbd' : '#D9D9D9'} textColor={selectedCategory === 'Food' ? '#6b7280' : 'black'} onClick={() => onSelect && onSelect('Food')} />
                        <CategoryTile name="Commute" icon={commuteBg} bgColor={selectedCategory === 'Commute' ? '#bdbdbd' : '#D9D9D9'} textColor={selectedCategory === 'Commute' ? '#6b7280' : 'black'} onClick={() => onSelect && onSelect('Commute')} />
                        <CategoryTile name="Entertainment" icon={entertainmentBg} bgColor={selectedCategory === 'Entertainment' ? '#bdbdbd' : '#D9D9D9'} textColor={selectedCategory === 'Entertainment' ? '#6b7280' : 'black'} onClick={() => onSelect && onSelect('Entertainment')} />
                        <CategoryTile name="Grocery" icon={groceryBg} bgColor={selectedCategory === 'Grocery' ? '#bdbdbd' : '#D9D9D9'} textColor={selectedCategory === 'Grocery' ? '#6b7280' : 'black'} onClick={() => onSelect && onSelect('Grocery')} />
                        <CategoryTile name="Shopping" icon={shoppingBg} bgColor={selectedCategory === 'Shopping' ? '#bdbdbd' : '#D9D9D9'} textColor={selectedCategory === 'Shopping' ? '#6b7280' : 'black'} onClick={() => onSelect && onSelect('Shopping')} />
                        <CategoryTile name="Miscellaneous" icon={miscellaneousBg} bgColor={selectedCategory === 'Miscellaneous' ? '#bdbdbd' : '#D9D9D9'} textColor={selectedCategory === 'Miscellaneous' ? '#6b7280' : 'black'} onClick={() => onSelect && onSelect('Miscellaneous')} />
                        
                    </div>

                    {/* Save changes button */}
                    <button
                        onClick={handleSaveClick}
                        style={{
                            width: "100%",
                            maxWidth: "400px",
                            padding: "20px",
                            fontSize: "1.3rem",
                            background: "rgba(200, 200, 200, 0.5)",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                            display: "block",
                            margin: "0 auto"
                        }}
                    >
                        Save changes
                    </button>
                </div>
            </div>

            {showDatePicker && (
                <DatePicker 
                    selectedDate={beginning} 
                    onDateSelect={handleDateSelect}
                    onClose={() => setShowDatePicker(false)}
                />
            )}
        </div>
    );
}

export default SelectCategory;