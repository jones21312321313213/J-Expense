import Header from "../Components/Header"; 
import bgImage from '../assets/bgLanding.jpg'

function Landing() {

  const pStyle = { 
    maxWidth: "600px", 
    marginTop: "20px", 
    fontSize: "18px", 
    lineHeight: "1.6",
    color: "black"
  };

  const landingStyles = {
    minHeight: "100vh",
    textAlign: "center",
    padding: "0 20px",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff"
  }

  return (
    <div style={landingStyles}>
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <h1 className = "text-black">Welcome to J-Expense Tracker</h1>
        <p style={pStyle}>
          The J Expense Tracker App is a web-based application that allows users to track their expenses while providing a built-in budget planner. 
          The app lets users manually input their spending, set bill reminders with notifications, and track their saving goals. 
          It also generates reports (graphs) that show users insights into their spending habits.
        </p>
      </div>
    </div>
  );
}

export default Landing;
