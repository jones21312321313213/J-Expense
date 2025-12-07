import { useNavigate } from "react-router-dom";
import bgForgot from '../../assets/bgForgotPassword.jpg';

function ForgotPassword() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/forgot-password/verify"); 
  };

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${bgForgot})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '60px 70px',
    borderRadius: '16px',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  };

  const logoStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  };

  const headerStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#333',
  };

  const descriptionStyle = {
    fontSize: '12px',
    color: '#555',
    marginBottom: '30px',
    padding: '0 20px',
  };

  const formGroupStyle = {
    textAlign: 'left',
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '5px',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const backLinkStyle = {
    display: 'block',
    marginTop: '20px',
    fontSize: '14px',
    color: '#333',
    textDecoration: 'none',
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        <h1 style={logoStyle}>J-Expense</h1>

        <h2 style={headerStyle}>Forgot Password?</h2>

        <p style={descriptionStyle}>
          Enter your email address to get the password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              id="email"
              placeholder="youremail@example.com"
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Password reset
          </button>
        </form>

        <a href="/login" style={backLinkStyle}>
          Back to log in
        </a>

      </div>
    </div>
  );
}

export default ForgotPassword;
