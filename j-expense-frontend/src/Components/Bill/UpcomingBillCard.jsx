// UpcomingBillCard.jsx
import React from 'react';

function UpcomingBillCard({ data }) {
    // Format amount with thousand separators
    const formattedAmount = data.amount ? data.amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) : '0.00';

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'No date';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid date';
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    // Determine status color
    const getStatusColor = () => {
        const status = data.status?.toLowerCase();
        switch(status) {
            case 'paid': 
                return { bg: '#00b894', text: '#00b894', light: 'rgba(0, 184, 148, 0.1)' };
            case 'pending': 
                return { bg: '#fdcb6e', text: '#fdcb6e', light: 'rgba(253, 203, 110, 0.1)' };
            case 'overdue': 
                return { bg: '#e17055', text: '#e17055', light: 'rgba(225, 112, 85, 0.1)' };
            default: 
                return { bg: '#636e72', text: '#636e72', light: 'rgba(99, 110, 114, 0.1)' };
        }
    };

    const statusColor = getStatusColor();

    // Styles
    const cardStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        margin: '8px 0',
        backgroundColor: '#F7EDED',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        border: '1px solid #f0f0f0',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
    };

    const leftSectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    };

    const rightSectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '6px',
    };

    const titleStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1a1a1a',
        letterSpacing: '-0.2px',
    };

    const amountStyle = {
        fontSize: '18px',
        fontWeight: '700',
        color: '#2d3436',
        letterSpacing: '-0.3px',
    };

    const dateContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    };

    const calendarIconStyle = {
        color: '#666',
        fontSize: '14px',
    };

    const dateStyle = {
        fontSize: '14px',
        color: '#666',
        fontWeight: '500',
    };

    const statusIndicatorStyle = {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: statusColor.bg,
    };

    const statusTextStyle = {
        fontSize: '12px',
        fontWeight: '500',
        color: statusColor.text,
        padding: '2px 8px',
        backgroundColor: statusColor.light,
        borderRadius: '12px',
        textTransform: 'uppercase',
    };

    // Handle hover effect with inline style
    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#e0e0e0';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
        e.currentTarget.style.borderColor = '#f0f0f0';
    };

    const handleClick = () => {
        console.log('Clicked bill:', data.id);
        // You can add more click functionality here
    };

    return (
        <div 
            style={cardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div style={leftSectionStyle}>
                <div style={titleStyle}>{data.title || 'Untitled Bill'}</div>
                <div style={dateContainerStyle}>
                    <i className="bi bi-calendar-event" style={calendarIconStyle}></i>
                    <div style={dateStyle}>Due: {formatDate(data.dueDate)}</div>
                </div>
            </div>
            <div style={rightSectionStyle}>
                <div style={amountStyle}>₱ {formattedAmount}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   
                </div>
            </div>
        </div>
    );
}

export default UpcomingBillCard;