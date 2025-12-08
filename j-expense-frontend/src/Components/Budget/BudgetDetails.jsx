/**
 * BudgetDetails.jsx
 * -----------------
 * A detailed view component for managing and tracking a specific budget.
 *
 * Features:
 * - Displays budget name (editable), remaining amount, and total budget.
 * - Shows a progress bar indicating spending progress over time.
 * - Displays start and end dates for the budget period.
 * - Calculates and shows daily spending allowance based on remaining days.
 * - Lists all transactions associated with the budget.
 * - Allows adding new transactions via a modal form.
 * - Supports deleting existing transactions.
 * - Full-screen overlay with gradient background for immersive experience.
 *
 * Props:
 * - `budget` (object): The budget object containing:
 *   - `name` (string): Budget name
 *   - `amount` (number): Total budget amount
 *   - `currentAmount` (number): Remaining budget amount
 *   - `startDateISO` (string): ISO date string for budget start date
 *   - `endDateISO` (string): ISO date string for budget end date
 * - `onClose` (function): Callback function to close the budget details view.
 *
 * State Management:
 * - `budgetName`: Editable budget name (local state).
 * - `totalBudget`: Total budget amount.
 * - `spent`: Amount spent from the budget.
 * - `transactions`: Array of transaction objects with description, amount, date, and id.
 * - `isEditing`: Boolean to toggle budget name editing mode.
 * - `showAddTransaction`: Boolean to control add transaction modal visibility.
 * - `newTransaction`: Object holding form data for new transaction.
 *
 * Calculations:
 * - `remaining`: Total budget minus spent amount.
 * - `percentage`: Spending progress as a percentage of total budget.
 * - `daysLeft`: Number of days remaining until budget end date.
 * - `dailyBudget`: Recommended daily spending based on remaining amount and days.
 *
 * Notes:
 * - Uses Lucide React icons for UI elements (ChevronLeft, Edit2, Plus).
 * - Styled with inline CSS styles for compatibility without Tailwind.
 * - Gradient background transitions from cyan to blue to orange.
 * - Transactions update budget calculations in real-time.
 * - Modal prevents click-through with event propagation control.
 */

import React, { useState } from 'react';
import { ChevronLeft, Edit2, Plus } from 'lucide-react';

export default function BudgetDetails({ budget, onClose }) {
  const [budgetName, setBudgetName] = useState(budget?.name || 'Name');
  const [totalBudget, setTotalBudget] = useState(budget?.amount || 500);
  const [spent, setSpent] = useState((budget?.amount || 500) - (budget?.currentAmount || 50));
  const [transactions, setTransactions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const remaining = totalBudget - spent;
  const percentage = totalBudget > 0 ? ((spent / totalBudget) * 100) : 0;
  
  const daysLeft = (() => {
    try {
      const today = new Date();
      const endDate = new Date(budget?.endDateISO || '2024-09-30');
      const diffTime = endDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 17;
    } catch (e) {
      return 17;
    }
  })();
  
  const dailyBudget = daysLeft > 0 && remaining > 0 ? (remaining / daysLeft).toFixed(2) : 0;

  const handleAddTransaction = () => {
    if (newTransaction.description && newTransaction.amount) {
      const amount = parseFloat(newTransaction.amount);
      setTransactions([...transactions, { ...newTransaction, amount, id: Date.now() }]);
      setSpent(spent + amount);
      setNewTransaction({ description: '', amount: '', date: new Date().toISOString().split('T')[0] });
      setShowAddTransaction(false);
    }
  };

  const handleDeleteTransaction = (id, amount) => {
    setTransactions(transactions.filter(t => t.id !== id));
    setSpent(spent - amount);
  };

  const getFormattedDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  const getDateRange = () => {
    const start = getFormattedDate(budget?.startDateISO || '2024-09-01');
    const end = getFormattedDate(budget?.endDateISO || '2024-09-30');
    return `${start} - ${end}`;
  };

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #a8d8ea, #d4e9f7, #f5e6d3)',
      minHeight: '100vh',
      height: '100%',
      width: '100%',
      overflow: 'auto',
      margin: 0,
      padding: '24px',
      boxSizing: 'border-box'
    }}>
      <div style={{ minHeight: '100vh', margin: 0 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '48px' 
          }}>
            <button 
              style={{
                width: '48px',
                height: '48px',
                border: '2px solid #1f2937',
                backgroundColor: '#fff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              onClick={onClose}
            >
              <ChevronLeft size={24} color="#1f2937" />
            </button>
            
            <div style={{ flex: 1, textAlign: 'center', margin: '0 16px' }}>
              {isEditing ? (
                <input
                  type="text"
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                  style={{
                    width: '100%',
                    fontSize: '1.875rem',
                    fontWeight: '600',
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                    outline: 'none',
                    borderBottom: '2px solid #1f2937',
                    padding: '8px 16px'
                  }}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                />
              ) : (
                <h1 style={{ 
                  fontSize: '1.875rem', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  margin: 0
                }}>
                  {budgetName}
                </h1>
              )}
            </div>
            
            <button 
              onClick={() => setIsEditing(true)}
              style={{
                width: '48px',
                height: '48px',
                border: '2px solid #1f2937',
                backgroundColor: '#fff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              <Edit2 size={24} color="#1f2937" />
            </button>
          </div>

          {/* Budget Summary */}
          <div style={{ marginBottom: '64px' }}>
            {/* Remaining Amount */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ 
                fontSize: '1.5rem', 
                fontWeight: '500', 
                color: '#374151',
                margin: 0
              }}>
                ₱{remaining} left of ₱{totalBudget}
              </p>
            </div>

            {/* Progress Section */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{ 
                fontSize: '1rem', 
                color: '#374151', 
                fontWeight: '500', 
                marginBottom: '16px' 
              }}>
                Today
              </p>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '48px',
                backgroundColor: '#4b5563',
                borderRadius: '24px',
                overflow: 'hidden',
                marginBottom: '16px'
              }}>
                <div style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  backgroundColor: '#4b5563',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'width 0.5s'
                }}>
                  <span style={{ 
                    color: '#fff', 
                    fontWeight: '600', 
                    fontSize: '1.125rem' 
                  }}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '1rem', 
                color: '#374151' 
              }}>
                <span>{getFormattedDate(budget?.startDateISO)}</span>
                <span>{getFormattedDate(budget?.endDateISO)}</span>
              </div>
            </div>

            {/* Daily Budget Info */}
            <p style={{ 
              textAlign: 'center', 
              color: '#374151', 
              fontSize: '1rem',
              margin: 0
            }}>
              You can spend <span style={{ fontWeight: '500' }}>₱{dailyBudget}/day</span> for <span style={{ fontWeight: '500' }}>{daysLeft} more days</span>
            </p>
          </div>

          {/* Transactions */}
          <div style={{ paddingBottom: '128px' }}>
            {transactions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <p style={{ 
                  color: '#1f2937', 
                  fontSize: '1.125rem', 
                  fontWeight: '500', 
                  marginBottom: '8px' 
                }}>
                  No transaction within the time range
                </p>
                <p style={{ color: '#374151', fontSize: '1rem', margin: 0 }}>
                  {getDateRange()}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      borderRadius: '12px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'}
                  >
                    <div>
                      <p style={{ 
                        fontWeight: '600', 
                        color: '#1f2937',
                        margin: '0 0 4px 0'
                      }}>
                        {transaction.description}
                      </p>
                      <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#4b5563',
                        margin: 0
                      }}>
                        {transaction.date}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <p style={{ 
                        fontSize: '1.125rem', 
                        fontWeight: '700', 
                        color: '#dc2626',
                        margin: 0
                      }}>
                        -₱{transaction.amount.toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id, transaction.amount)}
                        style={{
                          color: '#ef4444',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#b91c1c'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#ef4444'}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Transaction Button */}
          {/* <button
            onClick={() => setShowAddTransaction(true)}
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '32px',
              width: '64px',
              height: '64px',
              backgroundColor: '#fff',
              border: '4px solid #1f2937',
              color: '#1f2937',
              borderRadius: '50%',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s, background-color 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = '#fff';
            }}
            title="Add new transaction"
          >
            <Plus size={32} strokeWidth={3} />
          </button> */}

          {/* Add Transaction Modal */}
          {/* {showAddTransaction && (
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                zIndex: 50
              }}
              onClick={() => setShowAddTransaction(false)}
            >
              <div 
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  padding: '24px',
                  maxWidth: '448px',
                  width: '100%',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#1f2937', 
                  marginBottom: '24px',
                  marginTop: 0
                }}>
                  Add Transaction
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151', 
                      marginBottom: '8px' 
                    }}>
                      Description
                    </label>
                    <input
                      type="text"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#3b82f6';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="e.g., Groceries"
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151', 
                      marginBottom: '8px' 
                    }}>
                      Amount (₱)
                    </label>
                    <input
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#3b82f6';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151', 
                      marginBottom: '8px' 
                    }}>
                      Date
                    </label>
                    <input
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#3b82f6';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button
                    onClick={() => setShowAddTransaction(false)}
                    style={{
                      flex: 1,
                      padding: '8px 16px',
                      backgroundColor: '#e5e7eb',
                      color: '#374151',
                      fontWeight: '600',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTransaction}
                    style={{
                      flex: 1,
                      padding: '8px 16px',
                      backgroundColor: '#2563eb',
                      color: '#fff',
                      fontWeight: '600',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}