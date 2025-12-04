import React from 'react';

function BudgetProgressCard() {
  const budgetName = "Name";
  const currentAmount = 100;
  const totalAmount = 1000;
  const startDate = "Sep 1";
  const endDate = "Sep 30";
  const progressPercentage = 90;
  
  // Calculate days passed
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysPassed = today.getDate();
  const dayProgress = (daysPassed / daysInMonth) * 100;

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
        width: '100%',
        maxWidth: '800px',
        borderRadius: '30px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(to right, #a8d8ea 0%, #f5e6d3 100%)',
          padding: '30px 40px'
        }}>
          <h2 style={{
            margin: '0 0 10px 0',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#000'
          }}>
            {budgetName}
          </h2>
          <p style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#000'
          }}>
            P {currentAmount.toLocaleString()} <span style={{ fontWeight: 'normal' }}>left of P {totalAmount.toLocaleString()}</span>
          </p>
        </div>

        {/* Progress Section */}
        <div style={{
          background: '#d4d4d4',
          padding: '50px 40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            {/* Start Date */}
            <div style={{
              textAlign: 'center',
              minWidth: '60px'
            }}>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: '500',
                color: '#000'
              }}>
                {startDate.split(' ')[0]}
              </div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#000'
              }}>
                {startDate.split(' ')[1]}
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{
              flex: 1,
              position: 'relative'
            }}>
              {/* Today Label */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                left: `${dayProgress}%`,
                transform: 'translateX(-50%)',
                background: '#fff',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.85rem',
                fontWeight: '500',
                whiteSpace: 'nowrap'
              }}>
                Today
              </div>

              {/* Progress Bar Container */}
              <div style={{
                background: '#5a5a5a',
                height: '40px',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Progress Fill */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${progressPercentage}%`,
                  background: '#5a5a5a',
                  transition: 'width 0.3s ease'
                }}></div>

                {/* Percentage Text */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}>
                  {progressPercentage}%
                </div>
              </div>
            </div>

            {/* End Date */}
            <div style={{
              textAlign: 'center',
              minWidth: '60px'
            }}>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: '500',
                color: '#000'
              }}>
                {endDate.split(' ')[0]}
              </div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#000'
              }}>
                {endDate.split(' ')[1]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetProgressCard;
