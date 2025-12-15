function TransactionCard({ title, category, amount, date, iconName }) {
  const cardStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
    backgroundColor: "#FFF7F7",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };
  const iconStyle = { fontSize: "24px", marginRight: "10px", color: "#333", width: "40px", textAlign: "center" };
  const textStyle = { flex: 1 };
  const titleStyle = { fontWeight: "bold", fontSize: "14px", color: "#333" };
  const categoryStyle = { fontSize: "12px", color: "gray" };
  const amountStyle = { fontWeight: "bold", fontSize: "14px", color: "#333" };
  const dateStyle = { fontSize: "12px", color: "gray" };

  return (
    <div style={cardStyle}>
      <i className={iconName} style={iconStyle}></i>
      <div style={textStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={categoryStyle}>{category}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={amountStyle}>₱ {amount}</div>
        <div style={dateStyle}>{date}</div>
      </div>
    </div>
  );
}

export default TransactionCard;
