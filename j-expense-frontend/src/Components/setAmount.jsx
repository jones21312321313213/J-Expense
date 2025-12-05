
/**
 * SetAmount Component
 * ------------------
 * A custom numeric keypad modal for entering monetary amounts.
 * 
 * Features:
 *  - Displays a floating modal overlay with a numeric keypad.
 *  - Supports decimal input with a maximum of 2 decimal places.
 *  - Includes Clear, Cancel, and Set buttons.
 *  - Backspace key to remove digits.
 *  - Displays current input in a large display area.
 *  - Fully controlled via props:
 *      - initialValue: starting value (number)
 *      - onConfirm: callback returning the numeric value when user clicks Set
 *      - onClose: callback when modal closes (Cancel or outside click)
 *      - title: optional title for the modal
 * 
 * Usage:
 *  - Can be used for budget, transaction, or any numeric input fields.
 *  - Appears as a modal overlay, blocks interaction with background until closed.
 */


import React, { useState, useEffect } from 'react';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  },
  modal: {
    width: 340,
    maxWidth: '92%',
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
    overflow: 'hidden'
  },
  header: {
    padding: '12px 16px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: { fontSize: 16, fontWeight: 600 },
  display: { padding: '18px 16px', fontSize: 28, textAlign: 'right', background: '#fafafa' },
  keypad: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: 12, background: '#fff' },
  key: { padding: '14px 10px', textAlign: 'center', fontSize: 18, borderRadius: 8, background: '#f2f4f7', cursor: 'pointer', userSelect: 'none' },
  keyAccent: { background: '#4f46e5', color: '#fff' },
  footer: { display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #eee', background: '#fff' },
  btn: { flex: 1, padding: '10px 12px', borderRadius: 8, cursor: 'pointer', textAlign: 'center' },
  btnSecondary: { background: '#f3f4f6' },
  btnPrimary: { background: '#10b981', color: '#fff' }
};

function SetAmount({ initialValue = 0, onConfirm = () => {}, onClose = () => {}, title = 'Set Amount' }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (initialValue !== undefined && initialValue !== null) {
      setValue(String(initialValue));
    }
  }, [initialValue]);

  const append = (ch) => {
    if (ch === '.' && value.includes('.')) return;
    if (value.includes('.') && ch !== '.') {
      const decimals = value.split('.')[1] || '';
      if (decimals.length >= 2) return;
    }
    if (value === '0' && ch !== '.') {
      setValue(ch);
      return;
    }
    setValue((v) => (v || '') + ch);
  };

  const backspace = () => setValue((v) => (v || '').slice(0, -1));
  const clear = () => setValue('');

  const handleConfirm = () => {
    const parsed = parseFloat(value);
    const out = Number.isFinite(parsed) ? parsed : 0;
    onConfirm(out); // this will return a number
    onClose();
  };

  return (
    <div style={styles.overlay} onMouseDown={onClose}>
      <div style={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.title}>{title}</div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={styles.display}>{value || '0.00'}</div>

        <div style={styles.keypad}>
          {['7','8','9','4','5','6','1','2','3'].map((k) => (
            <div key={k} style={styles.key} onClick={() => append(k)}>{k}</div>
          ))}
          <div style={styles.key} onClick={() => append('0')}>0</div>
          <div style={styles.key} onClick={() => append('.')}>.</div>
          <div style={styles.key} onClick={backspace}>⌫</div>
        </div>

        <div style={styles.footer}>
          <div style={{ ...styles.btn, ...styles.btnSecondary }} onClick={clear}>Clear</div>
          <div style={{ ...styles.btn, ...styles.btnSecondary }} onClick={onClose}>Cancel</div>
          <div style={{ ...styles.btn, ...styles.btnPrimary }} onClick={handleConfirm}>Set</div>
        </div>
      </div>
    </div>
  );
}

export default SetAmount;
