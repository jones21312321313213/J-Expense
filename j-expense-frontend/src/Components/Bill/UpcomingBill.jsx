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

        // Sort by dueDate ascending (soonest first)
        const sortedBills = bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        // Take only top 3
        const top3Bills = sortedBills.slice(0, 3);

        setUpcomingBills(top3Bills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBills();
  }, []);

// UpcomingBill.jsx
const containerStyle = {
  padding: '0', // remove extra top/bottom padding
  minHeight: 'auto', // don't force full viewport height
  marginTop:"26px"
};

const listContainerStyle = {
  width: "500px",
  height: "280px", // optional: just to limit height if needed
  backgroundColor: "white",
  borderRadius: '15px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  overflowY: "auto", // scroll if more than maxHeight
  padding: "10px",
};


  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading bills...</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={listContainerStyle}>
        {upcomingBills.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666' }}>No upcoming bills</div>
        ) : (
          upcomingBills.map(bill => {
            const due = new Date(bill.dueDate);
            const formattedDate = due.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }); // e.g., "15 May, 2025"

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
    </div>
  );
}

export default UpcomingBill;
