import React, { useState, useEffect } from 'react';

/**
 * SetPeriodLength Component
 * ------------------------
 * A modal to select a numeric period length (e.g., every 1, 2, 3 days/weeks/months).
 * Same style as SetAmount, includes '.' for alignment but ignores it.
 *
 * Props:
 * - initialValue (number): starting value
 * - onConfirm (function): callback that returns the selected number
 * - onClose (function): callback when modal is closed
 * - title (string): optional modal title
 */

function SetPeriodLength({ initialValue = 1, onConfirm = () => {}, onClose = () => {}, title = 'Set Period Length' }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (initialValue !== undefined && initialValue !== null) {
      setValue(String(initialValue));
    }
  }, [initialValue]);

  const append = (ch) => {
    if (ch === '.') return; // ignore, only for keypad alignment
    setValue((v) => (v === '0' ? ch : v + ch));
  };

  const backspace = () => setValue((v) => (v || '').slice(0, -1));

  const handleConfirm = () => {
    const parsed = parseInt(value);
    const out = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    onConfirm(out);
    onClose();
  };

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    padding: '1rem',
  };

  const modalStyle = {
    backgroundColor: '#fdf0e1',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '25rem',
    textAlign: 'center',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  };

  const closeBtnStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#6b7280',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
  };

  const displayStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '1rem 0',
  };

  const keypadStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  };

  const keyStyle = {
    padding: '1rem 0',
    borderRadius: '1rem',
    backgroundColor: '#16a34a',
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem 0',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#299D91',
    borderRadius: '1rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>{title}</h2>
          <button style={closeBtnStyle} onClick={onClose}>×</button>
        </div>

        {/* Display */}
        <div style={displayStyle}>{value || '1'}</div>

        {/* Keypad */}
        <div style={keypadStyle}>
          {['7','8','9','4','5','6','1','2','3','.','0','⌫'].map((key) => (
            <div
              key={key}
              style={keyStyle}
              onClick={() => key === '⌫' ? backspace() : append(key)}
            >
              {key}
            </div>
          ))}
        </div>

        {/* Set Button */}
        <button
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
          onMouseDown={(e) => e.currentTarget.style.backgroundColor = '#166534'}
          onMouseUp={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
          onClick={handleConfirm}
        >
          Set
        </button>
      </div>
    </div>
  );
}

export default SetPeriodLength;
