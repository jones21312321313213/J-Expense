import bgForgot from '../../assets/bgForgotPassword.jpg';
import successIcon from '../../assets/successIcon.png'; // Confetti or success icon

function ForgotPasswordSuccess() {

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
    maxWidth: '600px', // Wider card
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
    marginBottom: '40px', 
    color: '#333',
  };
  
  const successMessageStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    margin: '0', // We'll control spacing with line breaks
    lineHeight: '1.4',
    textAlign: 'center',
  };

  const iconContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px', // More space between icons and text
    marginBottom: '30px',
  };

  const iconStyle = {
    width: '60px', // Larger icons
    height: '60px',
    objectFit: 'contain',
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px', 
    backgroundColor: '#333', 
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        
        {/* Logo */}
        <h1 style={logoStyle}>J-Expense</h1>
        
        {/* Header */}
        <h2 style={headerStyle}>Forgot Password?</h2>
        
        {/* Success Content */}
        <div style={iconContainerStyle}>
           <img src={successIcon} alt="Success Icon" style={iconStyle} />
           
           <p style={successMessageStyle}>
             Success! Your password has<br />been successfully changed.
           </p>
           
           <img src={successIcon} alt="Success Icon" style={iconStyle} />
        </div>

        {/* Back to Login Button */}
        <a href="/login" style={{ textDecoration: 'none', display: 'block' }}>
          <button style={buttonStyle}>
            Back to login
          </button>
        </a>
        
      </div>
    </div>
  );
}

export default ForgotPasswordSuccess;
