/**
 * DatePickerModal.jsx
 *
 * This component renders a fully custom calendar modal for selecting a date.
 * It displays the current month and year with navigation buttons to switch months,
 * and shows all days in a 6-row grid including previous and next month filler days.
 * Users can select a date, hover over days, and confirm or cancel their selection.
 *
 * Common use cases:
 * - Picking a transaction date in a dashboard or finance app
 * - Setting start/end dates for budgets or events
 *
 * Features:
 * - Month and year navigation
 * - Highlighted selected day
 * - Previous/next month filler days to maintain grid alignment
 * - "Ok" and "Cancel" action buttons
 * - Inline styling with hover and active effects
 *
 * Props (to extend for callbacks):
 * - onDateSelect: function(dateString) - called when a date is confirmed
 * - onClose: function() - called when modal is closed
 */
// idk where is this for but naa rani dre ig


import { useState } from 'react';

function DatePickerModal() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
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
            padding: '12px',
            textAlign: 'center',
            color: '#ccc',
            fontSize: '1rem'
          }}
        >
          {daysInPrevMonth - i}
        </div>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate;
      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(day)}
          style={{
            padding: '12px',
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: '8px',
            background: isSelected ? '#2563eb' : 'transparent',
            color: isSelected ? '#fff' : '#000',
            fontWeight: isSelected ? 'bold' : 'normal',
            fontSize: '1rem',
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
    
    // Next month days - fill remaining cells to complete the grid (6 rows = 42 cells)
    const totalCells = days.length;
    const remainingCells = 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div
          key={`next-${i}`}
          style={{
            padding: '12px',
            textAlign: 'center',
            color: '#ccc',
            fontSize: '1rem'
          }}
        >
          {i}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#b8e6e6',
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(to bottom, #f5e6d3 0%, #f5e6d3 100%)',
        borderRadius: '20px',
        padding: '30px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <h2 style={{
          margin: '0 0 30px 0',
          fontSize: '1.8rem',
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
          marginBottom: '25px'
        }}>
          <button
            onClick={handlePrevMonth}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '5px 10px',
              borderRadius: '5px'
            }}
          >
            &lt;
          </button>
          
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            <span style={{
              background: '#fff',
              padding: '8px 15px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>
              {months[currentMonth]}
            </span>
            <span style={{
              background: '#fff',
              padding: '8px 15px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>
              {currentYear}
            </span>
          </div>

          <button
            onClick={handleNextMonth}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
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
          gap: '5px',
          marginBottom: '10px'
        }}>
          {daysOfWeek.map(day => (
            <div
              key={day}
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '0.95rem',
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
          gap: '5px',
          marginBottom: '30px'
        }}>
          {renderCalendar()}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <button
            style={{
              background: '#3d9b9b',
              color: '#fff',
              border: 'none',
              padding: '15px',
              borderRadius: '10px',
              fontSize: '1.1rem',
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
            style={{
              background: '#ff6b6b',
              color: '#fff',
              border: 'none',
              padding: '15px',
              borderRadius: '10px',
              fontSize: '1.1rem',
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

export default DatePickerModal;