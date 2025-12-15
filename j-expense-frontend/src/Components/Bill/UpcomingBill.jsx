import React, { useEffect, useState } from 'react';
import UpcomingBillCard from './UpcomingBillCard';
import { billService } from '../../Components/Services/BillService';

function UpcomingBill() {
  const [upcomingBills, setUpcomingBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBills = async () => {
      try {
        const bills = await billService.getBills();

        const sortedBills = bills.sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );

        const top3Bills = sortedBills.slice(0, 3);

        setUpcomingBills(top3Bills);
      } catch (error) {
        console.error('Error fetching bills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBills();
  }, []);

  const containerStyle = {
    padding: 0,
    minHeight: 'auto',
    marginTop: '26px',
    display: 'flex',
    justifyContent: 'center',
  };

  const listContainerStyle = {
    width: '500px',
    height: '280px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    padding: '10px',
    overflowY: 'scroll',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE 10+
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading bills...
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={listContainerStyle} className="hide-scrollbar">
        {upcomingBills.length === 0 ? (
          <div style={{ textAlign:'center', marginTop:'120px', color: '#666' }}>
            No upcoming bills
          </div>
        ) : (
          upcomingBills.map((bill) => {
            const due = new Date(bill.dueDate);
            const formattedDate = due.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <UpcomingBillCard
                key={bill.id}
                data={{
                  title: bill.name,
                  amount: bill.amount,
                  dueDate: formattedDate,
                }}
              />
            );
          })
        )}
      </div>

      {/* Global style to hide scrollbars in Webkit browsers */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            width: 0px;
            height: 0px;
          }
        `}
      </style>
    </div>
  );
}

export default UpcomingBill;
