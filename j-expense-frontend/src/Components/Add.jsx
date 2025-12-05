

// this is the add Icon on the select category
function Add({ onClick }) {
    const bgStyle = {
        backgroundColor: "#D9D9D9",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "8px",
    };

    const iconStyle = {
        fontSize: "3rem",
        color: "grey",
    };

    return (
        <div style={bgStyle} onClick={onClick}>
            <i className="bi bi-plus-lg" style={iconStyle}></i>
        </div>
    );
}

export default Add;
