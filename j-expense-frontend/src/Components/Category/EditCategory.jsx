import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditCategory() {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, icon } = location.state || {};

    const containerStyle = {
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        background: "linear-gradient(135deg, #c7e8ff, #ffe6cc)",
        width: "700px",          
        minHeight: "600px",     
        boxSizing: "border-box",
        borderRadius: "20px",   
        margin: "50px auto",    
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)", 
    };


    const backStyle = {
        alignSelf: "flex-start",
        fontSize: "24px",
        cursor: "pointer",
        marginBottom: "10px",
        fontWeight: "300",
    };

    const titleStyle = {
        fontSize: "48px",
        fontWeight: "600",
        marginBottom: "10px",
    };

    const labelStyle = {
        fontSize: "18px",
        fontWeight: "500",
        marginTop: "10px",
        borderBottom: "1px solid #000",
        width: "200px",
        textAlign: "center",
        paddingBottom: "5px",
    };

    const imageStyle = {
        width: "150px",
        height: "150px",
        marginTop: "20px",
        borderRadius: "14px",
        objectFit: "contain",
        border: "3px solid black",
        padding: "10px",
    };

    const noteStyle = {
        fontSize: "10px",
        marginTop: "5px",
        opacity: 0.7,
    };

    const buttonStyle = {
        marginTop: "20px",
        padding: "10px 40px",
        backgroundColor: "#ddd",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
        fontWeight: "600",
    };

    return (
        <div style={containerStyle}>
            {/* BACK BUTTON */}
            <div style={backStyle} onClick={() => navigate(-1)}>
                &lt;
            </div>

            {/* PAGE TITLE */}
            <h2 style={titleStyle}>Categories</h2>

            {/* SUBTITLE */}
            <div style={{ fontSize: "18px", marginBottom: "10px" }}>Edit category</div>

            {/* NAME */}
            <div style={labelStyle}>{name || "Name"}</div>

            {/* ICON */}
            <img src={icon} alt={name} style={imageStyle} />

            <p style={noteStyle}>(upload image if custom categories)</p>

            {/* SAVE BUTTON */}
            <button style={buttonStyle}>Save changes</button>
        </div>
    );
}

export default EditCategory;
