import { useState } from "react";
import "./NotificationPanel.css";


function NotificationPanel({ isOpen, onClose }) {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "bill",
            title: "Upcoming Bill",
            message: "You have an upcoming bill for Water Bill due on September 21",
            icon: "bi-credit-card"
        },
        {
            id: 2,
            type: "budget",
            title: "Budget Warning",
            message: "You have ₱100 left to save within September 22",
            icon: "bi-wallet2"
        },
        {
            id: 3,
            type: "spending",
            title: "Spending Limit",
            message: "You have ₱200 left to spend for September 22",
            icon: "bi-exclamation-triangle"
        },
        {
            id: 4,
            type: "spending",
            title: "Spending Limit",
            message: "You have ₱200 left to spend for September 22",
            icon: "bi-exclamation-triangle"
        },
        {
            id: 5,
            type: "spending",
            title: "Spending Limit",
            message: "You have ₱200 left to spend for September 22",
            icon: "bi-exclamation-triangle"
        },
        {
            id: 6,
            type: "spending",
            title: "Spending Limit",
            message: "You have ₱200 left to spend for September 22",
            icon: "bi-exclamation-triangle"
        },
        {
            id: 7,
            type: "spending",
            title: "Spending Limit",
            message: "You have ₱200 left to spend for September 22",
            icon: "bi-exclamation-triangle"
        },
        {
            id: 8,
            type: "spending",
            title: "Spending Limit",
            message: "You have ₱200 left to spend for September 22",
            icon: "bi-exclamation-triangle"
        },
        {
            id: 9,
            type: "spending",
            title: "Spending Limit",
            message: "You have ₱200 left to spend for September 22",
            icon: "bi-exclamation-triangle"
        },
        {
            id: 10,
            type: "spending",
            title: "Spending Limit",
            message: "You have ₱200 left to spend for September 22",
            icon: "bi-exclamation-triangle"
        },
        
    ]);

    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteConfirm(id);
    };

    const confirmDelete = () => {
        setNotifications(notifications.filter(n => n.id !== deleteConfirm));
        setDeleteConfirm(null);
    };

    const cancelDelete = () => {
        setDeleteConfirm(null);
    };

    return (
        <>
            {isOpen && <div className="notification-overlay" onClick={onClose}></div>}
            
            <div className={`notification-panel ${isOpen ? "open" : ""}`}>
                {/* Header */}
                <div className="notification-header">
                    <h3>Notifications</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                {/* Notifications List */}
                <div className="notifications-list">
                    {notifications.length === 0 ? (
                        <div className="no-notifications">
                            <p>No notifications</p>
                        </div>
                    ) : (
                        notifications.map(notification => (
                            <div key={notification.id} className="notification-item">
                                <div className="notification-content">
                                    <i className={`bi ${notification.icon}`}></i>
                                    <div className="notification-text">
                                        <h4>{notification.title}</h4>
                                        <p>{notification.message}</p>
                                    </div>
                                </div>
                                <button 
                                    className="delete-btn"
                                    onClick={() => handleDeleteClick(notification.id)}
                                    title="Delete notification"
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Ads & Promos */}
                <div className="ads-section">
                    <h4>Ads & Promos</h4>
                    <div className="promo-card">
                        <p><strong>Unlimited Budget Plans</strong></p>
                        <p>Get premium features for ₱500 per year</p>
                        <button className="upgrade-btn">Learn More</button>
                    </div>
                </div>

                {/* Expenses Breakdown */}
                {/* <ExpensesBreakdownCard /> */}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal">
                        <h3>Delete Notification?</h3>
                        <p>Are you sure you want to delete this notification?</p>
                        <div className="modal-buttons">
                            <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
                            <button className="delete-confirm-btn" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NotificationPanel;
