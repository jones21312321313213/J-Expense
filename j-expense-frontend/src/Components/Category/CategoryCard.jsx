import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryCard({ icon, name, type, onDelete, onClick, id, isDefault }) {
    const navigate = useNavigate();

    const handleClick = () => {
        // allow parent to override navigation if provided via props
        if (typeof onClick === 'function') {
            onClick();
            return;
        }
        // include full payload so the editor has the id and flags it needs
        if (id) {
            navigate(`../edit-category/${id}`, { state: { id, name, type, isDefault, icon } });
        } else {
            navigate("../edit-category", { state: { name, type, icon } });
        }
    };

    const cardContainerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF8E1",
        padding: "15px 20px",
        borderRadius: "10px",
        width: "100%",
        boxSizing: "border-box",
        marginBottom: "10px",
        cursor: "pointer",
    };

    const deleteBtnStyle = {
        fontSize: "22px",
        cursor: "pointer",
        padding: "10px",
    };

    return (
        <div style={cardContainerStyle} onClick={handleClick}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img src={icon} alt="icon" style={{ width: "40px", height: "40px" }} />

                <div>
                    <span style={{ fontSize: "20px", fontWeight: "600" }}>{name}</span>
                    <span style={{ fontSize: "12px", color: "#666", display: "block" }}>{type}</span>
                </div>
            </div>

                    {typeof onDelete === 'function' && (
                <i 
                    className="bi bi-trash3-fill" 
                    style={deleteBtnStyle}
                    onClick={(e) => {
                        e.stopPropagation();   // prevents triggering edit navigation
                        onDelete();
                    }}
                ></i>
            )}
        </div>
    );
}

export default CategoryCard;
