import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryCard({ icon, name, type }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/edit-category", {
            state: {
                name,
                icon,
            }
        });
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

    return (
        <div style={cardContainerStyle} onClick={handleClick}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img src={icon} alt="icon" style={{ width: "40px", height: "40px" }} />

                <div>
                    <span style={{ fontSize: "20px", fontWeight: "600" }}>{name}</span>
                    <span style={{ fontSize: "12px", color: "#666", display: "block" }}>{type}</span>
                </div>
            </div>

            <i className="bi bi-trash3-fill" style={{ fontSize: "22px" }}></i>
        </div>
    );
}

export default CategoryCard;
