function ForgetPassword() {

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #FFEFBA 0%, #FFFFFF 50%, #FFC3A0 100%)', 
    padding: '20px',
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '40px 50px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
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
    backgroundColor: '#333', // Dark background for the button
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
        
        {/* Logo/App Name */}
        <h1 style={logoStyle}>J-Expense</h1>
        
        {/* Header */}
        <h2 style={headerStyle}>Forgot Password?</h2>
        
        {/* Description */}
        <p style={descriptionStyle}>
          Enter your email address to get the password reset link.
        </p>

        <form>
          {/* Email Input */}
          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@email.com"
              style={inputStyle}
              // You would typically use useState here to capture the value
            />
          </div>

          {/* Password Reset Button */}
          <button type="submit" style={buttonStyle}>
            Password reset
          </button>
        </form>

        {/* Back to Login Link */}
        <a href="/login" style={backLinkStyle}>
          Back to log in
        </a>

      </div>
    </div>
  );
}

export default ForgetPassword;