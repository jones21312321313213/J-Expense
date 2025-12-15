// UpcomingBillCard.jsx
import React from 'react';

function UpcomingBillCard({ data }) {
    const cardStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '1px solid #f0f0f0',
    };

    const titleStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
    };

    const amountStyle = {
        fontSize: '16px',
        fontWeight: '700',
        color: '#333',
    };

    const dateStyle = {
        fontSize: '14px',
        color: '#666',
        marginRight: '10px',
    };

    return (
        <div style={cardStyle}>
            <div>
                <div style={titleStyle}>{data.title}</div>
                <div style={dateStyle}>Due: {data.dueDate}</div>
            </div>
            <div style={amountStyle}>₱ {data.amount}</div>
        </div>
    );
}

export default UpcomingBillCard;
