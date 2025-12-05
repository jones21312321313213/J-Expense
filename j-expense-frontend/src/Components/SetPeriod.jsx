import React, { useState } from 'react';

function SetPeriod({ initialPeriod = 'Monthly', onSelectPeriod, onClose }) {
  const [localSelection, setLocalSelection] = useState(initialPeriod);
  const [showModal, setShowModal] = useState(true);
  const periods = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  if (!showModal) return null;

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    padding: '1rem',
  };

  const modalStyle = {
    backgroundColor: '#fdf0e1',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '30rem',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  };

  const closeBtnStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#6b7280',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
  };

  const optionsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
  };

  const getLabelStyle = (isSelected) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    border: `2px solid ${isSelected ? '#16a34a' : '#86efac'}`,
    borderRadius: '1rem',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  const radioStyle = {
    marginRight: '0.75rem',
    height: '1.25rem',
    width: '1.25rem',
    accentColor: '#16a34a',
  };

  const spanStyle = (isSelected) => ({
    fontSize: '1.125rem',
    fontWeight: 500,
    color: isSelected ? '#15803d' : '#16a34a',
  });

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem 0',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#16a34a',
    borderRadius: '1rem',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    border: 'none',
  };

  const handleSelect = () => {
    if (onSelectPeriod) onSelectPeriod(localSelection);
    setShowModal(false);
    if (onClose) onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>Select period</h2>
          <button
            style={closeBtnStyle}
            onClick={() => {
              setShowModal(false);
              if (onClose) onClose();
            }}
          >
            ×
          </button>
        </div>

        <div style={optionsStyle}>
          {periods.map((period, index) => {
            const isSelected = localSelection === period;
            return (
              <label key={period} style={getLabelStyle(isSelected)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name="periodRadio"
                    id={`periodRadio${index}`}
                    value={period}
                    checked={isSelected}
                    onChange={() => setLocalSelection(period)}
                    style={radioStyle}
                  />
                  <span style={spanStyle(isSelected)}>{period}</span>
                </div>
              </label>
            );
          })}
        </div>

        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#15803d')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#16a34a')}
          onMouseDown={(e) => (e.currentTarget.style.backgroundColor = '#166534')}
          onMouseUp={(e) => (e.currentTarget.style.backgroundColor = '#15803d')}
          onClick={handleSelect}
        >
          Set period length
        </button>
      </div>
    </div>
  );
}

export default SetPeriod;
