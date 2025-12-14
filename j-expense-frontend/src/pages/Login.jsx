import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgLanding.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await res.json();

      // ✅ SAVE LOGIN SESSION
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);

      // ✅ Redirect after login
      navigate("/app/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div
              style={{
                border: "2px solid #ffffff",
                borderRadius: "8px",
                padding: "40px 30px",
                backgroundColor: "white",
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4 fw-bold">J-EXPENSE</h1>

                {error && (
                  <div className="alert alert-danger text-center">
                    {error}
                  </div>
                )}

                <div className="mb-3 text-start">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3 position-relative">
                  <label className="form-label">Password</label>
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i
                    className={`bi ${
                      passwordShown ? "bi-eye" : "bi-eye-slash"
                    }`}
                    style={{
                      position: "absolute",
                      top: "38px",
                      right: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => setPasswordShown(!passwordShown)}
                  ></i>
                </div>

                <button type="submit" className="btn btn-dark w-100 mb-3">
                  Login
                </button>

                <div className="text-center">
                  <a
                    href="/register"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Create an account
                  </a>
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
