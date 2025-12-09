/**
 * DatePicker Component
 * -------------------
 * A custom calendar modal component for selecting a date.
 */
import { useState } from 'react';

function DatePicker({ selectedDate, onDateSelect, onClose }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [tempDate, setTempDate] = useState(() => {
    if (selectedDate) {
      // Initializing tempDate from the selectedDate string (which may now be an ISO string)
      const d = new Date(selectedDate);
      // Use UTC getters for initialization robustness
      if (!isNaN(d)) {
        setCurrentMonth(d.getUTCMonth());
        setCurrentYear(d.getUTCFullYear());
        return d.getUTCDate();
      }
    }
    return today.getDate();
  });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const getPrevMonthDaysCount = (month, year) => {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    return getDaysInMonth(prevMonth, prevYear);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleMonthPick = (m) => {
    setCurrentMonth(m);
    setShowMonthDropdown(false);
  };

  const handleYearPick = (y) => {
    setCurrentYear(y);
    setShowYearDropdown(false);
  };

  const handleDateSelect = (day) => {
    // Only set the temporary selection here. Confirm on Ok.
    setTempDate(day);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getPrevMonthDaysCount(currentMonth, currentYear);

    const days = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          style={{
            padding: '8px',
            textAlign: 'center',
            color: '#ccc',
            fontSize: '0.9rem'
          }}
        >
          {daysInPrevMonth - i}
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === tempDate;
      days.push(
        <div
          key={day}
          onClick={() => handleDateSelect(day)}
          style={{
            padding: '8px',
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: '6px',
            background: isSelected ? '#2563eb' : 'transparent',
            color: isSelected ? '#fff' : '#000',
            fontWeight: isSelected ? 'bold' : 'normal',
            fontSize: '0.9rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!isSelected) {
              e.target.style.background = '#f0f0f0';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected) {
              e.target.style.background = 'transparent';
            }
          }}
        >
          {day}
        </div>
      );
    }

    // Next month days
    const totalCells = days.length;
    const remainingCells = 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div
          key={`next-${i}`}
          style={{
            padding: '8px',
            textAlign: 'center',
            color: '#ccc',
            fontSize: '0.9rem'
          }}
        >
          {i}
          </div>
      );
    }

    return days;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(to bottom, #f5e6d3 0%, #f5e6d3 100%)',
          borderRadius: '20px',
          padding: '30px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h2 style={{
          margin: '0 0 25px 0',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#000'
        }}>
          Select date
        </h2>

        {/* Month/Year Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <button
            onClick={handlePrevMonth}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.3rem',
              cursor: 'pointer',
              padding: '5px 10px',
              borderRadius: '5px'
            }}
          >
            &lt;
          </button>

          <div style={{
            display: 'flex',
            gap: '10px',
            position: 'relative',
            alignItems: 'center'
          }}>
            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => { e.stopPropagation(); setShowMonthDropdown(!showMonthDropdown); setShowYearDropdown(false); }}
                style={{
                  background: '#fff',
                  padding: '8px 15px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {months[currentMonth]}
              </button>

              {showMonthDropdown && (
                <div onClick={(e) => e.stopPropagation()} style={{
                  position: 'absolute',
                  top: '44px',
                  left: 0,
                  background: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.12)',
                  padding: '8px',
                  zIndex: 2100,
                  width: '160px'
                }}>
                  {months.map((m, idx) => (
                    <div key={m} onClick={() => handleMonthPick(idx)} style={{ padding: '6px 8px', cursor: 'pointer', borderRadius: '6px' }} onMouseEnter={(e)=> e.currentTarget.style.background='#f0f0f0'} onMouseLeave={(e)=> e.currentTarget.style.background='transparent'}>
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => { e.stopPropagation(); setShowYearDropdown(!showYearDropdown); setShowMonthDropdown(false); }}
                style={{
                  background: '#fff',
                  padding: '8px 15px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {currentYear}
              </button>

              {showYearDropdown && (
                <div onClick={(e) => e.stopPropagation()} style={{
                  position: 'absolute',
                  top: '44px',
                  left: 0,
                  background: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.12)',
                  padding: '8px',
                  zIndex: 2100,
                  width: '120px',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {Array.from({ length: 21 }).map((_, i) => {
                    const year = currentYear - 10 + i;
                    return (
                      <div key={year} onClick={() => handleYearPick(year)} style={{ padding: '6px 8px', cursor: 'pointer', borderRadius: '6px' }} onMouseEnter={(e)=> e.currentTarget.style.background='#f0f0f0'} onMouseLeave={(e)=> e.currentTarget.style.background='transparent'}>
                        {year}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleNextMonth}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.3rem',
              cursor: 'pointer',
              padding: '5px 10px',
              borderRadius: '5px'
            }}
          >
            &gt;
          </button>
        </div>

        {/* Days of Week */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '3px',
          marginBottom: '8px'
        }}>
          {daysOfWeek.map(day => (
            <div
              key={day}
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                color: '#333'
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '3px',
          marginBottom: '25px'
        }}>
          {renderCalendar()}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => {
              // FIX APPLIED HERE: Use Date.UTC() to force the Date object to represent 
              // the selected day at midnight in UTC, preserving the date upon toISOString().
              const selected = new Date(Date.UTC(currentYear, currentMonth, tempDate));
              if (onDateSelect) onDateSelect(selected.toISOString());
              if (onClose) onClose();
            }}
            style={{
              width: '100%',
              background: '#3d9b9b',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#2d8080'}
            onMouseLeave={(e) => e.target.style.background = '#3d9b9b'}
          >
            Ok
          </button>

          <button
            onClick={() => {
              if (onClose) onClose();
            }}
            style={{
              width: '100%',
              background: '#ff6b6b',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#ff5252'}
            onMouseLeave={(e) => e.target.style.background = '#ff6b6b'}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DatePicker;