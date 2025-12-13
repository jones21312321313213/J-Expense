import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from '../assets/bgLanding.jpg';

function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  // ------------------------------- STYLES -------------------------------
  const mainBox = {
    border: "2px solid #ffffff",
    borderRadius: "8px",
    padding: "40px 30px",
    backgroundColor: "white",
    color: "#000",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "500px",
  };

  const labelStyle = {
    marginBottom: "6px",
    display: "block",
  };

  const inputStyle = {
    height: "40px",
  };

  const passwordContainer = {
    marginBottom: "1.5rem",
    position: "relative",
  };

  const eyeIcon = {
    position: "absolute",
    top: "38%",
    right: "10px",
    cursor: "pointer",
    transform: "translateY(10px)",
    fontSize: "1.2rem",
  };

  const dividerWrapper = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "20px 0",
  };

  const dividerLine = {
    flex: 1,
    height: "1px",
    backgroundColor: "#ccc",
  };

  const dividerText = {
    margin: "0 10px",
    color: "#666",
    fontSize: "14px",
    fontWeight: "bold",
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
  };

  const bgStyle = {
    minHeight: "100vh",
    padding: "20px",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={bgStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div style={mainBox}>

              {/* ORIGINAL FORM SUBMIT (COMMENTED OUT)
              <form onSubmit={handleSubmit}>
              */}

              {/* TEMPORARY LOGIN → DASHBOARD */}
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // prevent page refresh
                  navigate("/app/dashboard"); // TEMP redirect
                }}
              >
                <h1 style={titleStyle}>J-EXPENSE</h1>

                <div className="mb-3 text-start">
                  <label style={labelStyle}>Username</label>
                  <input
                    name="username"
                    className="form-control"
                    placeholder="Enter username"
                    style={inputStyle}
                  />
                </div>

                <div style={passwordContainer}>
                  <label style={labelStyle}>Password</label>
                  <input
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    style={inputStyle}
                  />
                  <i
                    className={`bi ${passwordShown ? "bi-eye" : "bi-eye-slash"}`}
                    style={eyeIcon}
                    onClick={() => setPasswordShown(!passwordShown)}
                  ></i>
                </div>

                <div className="mb-3 text-start">
                  <a
                    href="/forgot-password"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Forgot password?
                  </a>
                </div>

                <button type="submit" className="btn btn-dark w-100 mb-3">
                  Login
                </button>

                <div style={dividerWrapper}>
                  <div style={dividerLine}></div>
                  <span style={dividerText}>OR</span>
                  <div style={dividerLine}></div>
                </div>

                <div className="text-center">
                  <p>
                    <a
                      href="/register"
                      style={{
                        marginLeft: "5px",
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      Create an account
                    </a>
                  </p>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
