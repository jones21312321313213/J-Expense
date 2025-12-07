import bgForgot from '../../assets/bgForgotPassword.jpg'
import { useNavigate } from "react-router-dom";
function ForgotPasswordVerificationCode() {


    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/forgot-password/success"); 
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
    padding: '60px 80px', // Increased padding
    borderRadius: '16px',      
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '500px', // Increased width
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
    fontSize: '14px',
    color: '#555',
    marginBottom: '30px',
    padding: '0 10px',
  };

  const formGroupStyle = {
    textAlign: 'left',
    marginBottom: '20px',
    marginTop: '40px',
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
    padding: '12px', // Increased input padding
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px', // Increased button padding
    backgroundColor: '#333', 
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const resendLinkStyle = {
    display: 'block',
    marginTop: '15px',
    fontSize: '14px',
    color: '#333',
    textDecoration: 'none',
    textAlign: 'center',
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={logoStyle}>J-Expense</h1>
        <h2 style={headerStyle}>Forgot Password?</h2>
        <p style={descriptionStyle}>
          We have sent a code to your email. Please enter it here
        </p>

        <form>
          <div style={formGroupStyle}>
            <label htmlFor="code" style={labelStyle}>Code</label>
            <input
              type="text"
              id="code"
              placeholder="123123123"
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle} onClick = {handleSubmit}>
            Submit code
          </button>
        </form>

        <a href="#" style={resendLinkStyle}>
          Resend code
        </a>
      </div>
    </div>
  );
}

export default ForgotPasswordVerificationCode;
