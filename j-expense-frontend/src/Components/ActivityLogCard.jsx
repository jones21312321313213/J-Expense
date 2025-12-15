import React from 'react';

/**
 * Simple card to display a single activity log entry.
 */
function ActivityLogCard({ date, title, amount, type, category, iconName }) {

    const isIncome = type === 'income';
    const amountColor = isIncome ? '#00A86B' : '#FF5B5B';
    const amountIcon = isIncome ? 'bi-arrow-up-circle-fill' : 'bi-arrow-down-circle-fill';

    const displayCategory = category ? category.toUpperCase() : 'ACTIVITY';

    const cardStyle = {
        backgroundColor: '#FFFBEA', // You can remove/change if parent provides background
        borderRadius: '15px',
        padding: '15px',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
    };

    const iconWrapperStyle = {
        backgroundColor: '#D9D9D9',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '15px',
    };

    const textGroupStyle = { flexGrow: 1, textAlign: 'left' };
    const dateStyle = { fontSize: '12px', color: '#666', marginBottom: '4px' };
    const titleStyle = { fontSize: '16px', fontWeight: 'bold', color: '#333' };
    const amountStyle = { fontSize: '18px', fontWeight: '700', color: amountColor, display: 'flex', alignItems: 'center' };
    const iconStyle = { fontSize: '20px', color: '#333' };
    const arrowIconStyle = { fontSize: '16px', marginRight: '5px', color: amountColor };

    const cardIconClass = iconName || 'bi-bag';

    return (
        <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={iconWrapperStyle}>
                    <i className={cardIconClass} style={iconStyle}></i>
                </div>
                <div style={textGroupStyle}>
                    <div style={dateStyle}>
                        {date} • {displayCategory}
                    </div>
                    <div style={titleStyle}>{title}</div>
                </div>
            </div>

            <div style={amountStyle}>
                <i className={amountIcon} style={arrowIconStyle}></i>
                <span style={{ marginRight: '5px' }}>₱</span>
                {amount}
            </div>
        </div>
    );
}

export default ActivityLogCard;
