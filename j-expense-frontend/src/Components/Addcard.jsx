

// this is the add for the dashboard goals and budget the one where there is a + 
function Addcard() {

  const bgStyleOutside = {
    backgroundColor: "white",
    marginTop: "20px",
    borderRadius: "10px",
    padding: "40px",
    width: "500px"
  };

  const bgStyleInside = {
    width: "350px",
    height: "200px",
    border: "5px solid grey",
    cursor: "pointer",
    transition: "0.2s",
    display: "flex",
    flexDirection: "column",   
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <div className="container d-flex justify-content-center" style={bgStyleOutside}>
      <div style={bgStyleInside}>
        <i
          className="bi bi-plus-lg"
          style={{ fontSize: "3rem", color: "grey" }}
        ></i>

        <p style={{ fontSize: "1.2rem", color: "grey" }}>
          Text
        </p>
      </div>
    </div>
  );
}

export default Addcard;
