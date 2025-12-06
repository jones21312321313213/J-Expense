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
    <div className="fixed inset-0 bg-gradient-to-br from-cyan-100 via-blue-50 to-orange-100 overflow-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <button 
              className="w-12 h-12 border-2 border-gray-800 bg-white hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center" 
              onClick={onClose}
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            
            <div className="flex-1 text-center mx-4">
              {isEditing ? (
                <input
                  type="text"
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                  className="w-full text-3xl font-semibold text-center bg-transparent outline-none border-b-2 border-gray-800 px-4 py-2"
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                />
              ) : (
                <h1 className="text-3xl font-semibold text-gray-800">{budgetName}</h1>
              )}
            </div>
            
            <button 
              onClick={() => setIsEditing(true)}
              className="w-12 h-12 border-2 border-gray-800 bg-white hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center"
            >
              <Edit2 className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Budget Summary */}
          <div className="mb-16">
            {/* Remaining Amount */}
            <div className="text-center mb-12">
              <p className="text-2xl font-medium text-gray-700">
                ₱{remaining} left of ₱{totalBudget}
              </p>
            </div>

            {/* Progress Section */}
            <div className="mb-8">
              <p className="text-base text-gray-700 font-medium mb-4">Today</p>
              <div className="relative w-full h-12 bg-gray-600 rounded-full overflow-hidden mb-4">
                <div 
                  className="absolute h-full bg-gray-600 transition-all duration-500 flex items-center justify-center"
                  style={{ width: '100%' }}
                >
                  <span className="text-white font-semibold text-lg">{percentage.toFixed(0)}%</span>
                </div>
              </div>
              <div className="flex justify-between text-base text-gray-700">
                <span>{getFormattedDate(budget?.startDateISO)}</span>
                <span>{getFormattedDate(budget?.endDateISO)}</span>
              </div>
            </div>

            {/* Daily Budget Info */}
            <p className="text-center text-gray-700 text-base">
              You can spend <span className="font-medium">₱{dailyBudget}/day</span> for <span className="font-medium">{daysLeft} more days</span>
            </p>
          </div>

          {/* Transactions */}
          <div className="pb-32">
            {transactions.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-800 text-lg font-medium mb-2">
                  No transaction within the time range
                </p>
                <p className="text-gray-700 text-base">{getDateRange()}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-red-600">-₱{transaction.amount.toFixed(2)}</p>
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id, transaction.amount)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
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
          <button
            onClick={() => setShowAddTransaction(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-white border-4 border-gray-800 text-gray-800 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform hover:bg-gray-50"
            title="Add new transaction"
          >
            <Plus className="w-8 h-8" strokeWidth={3} />
          </button>

          {/* Add Transaction Modal */}
          {showAddTransaction && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Transaction</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., Groceries"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Amount (₱)
                    </label>
                    <input
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowAddTransaction(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTransaction}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}