import { Routes, Route } from 'react-router-dom';
import Base from './pages/Base'; 
import Login from './pages/Login';
import Landing from './pages/Landing';

// Import all the pages that will load inside the Base layout
import Dashboard from './pages/Dashboard';
import Budgets from './pages/Budgets';
import Transactions from './pages/Transactions';
import Bills from './pages/Bills';
import Expenses from './pages/Expenses';
import Goals from './pages/Goals';
import ActivityLog from './pages/ActivityLog';
import Settings from './pages/Settings';
import BudgetDetails from './pages/BudgetDetails';
import GoalsDetails from './pages/GoalsDetails';
import CategoryDetails from './pages/CategoryDetails';
import AddTransactionPage from './pages/AddTransactionPage';

// ✅ Import the providers
import { TransactionsProvider } from './context/TransactionsContext';
import { GoalsProvider } from './context/GoalsContext';

function App() {
  return (
    <TransactionsProvider>
      <Routes>
        {/* 1. Public Routes */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* 2. Protected/Layout Routes */}
        <Route
          path="/"
          element={
            // ✅ Wrap Base layout with GoalsProvider
            <GoalsProvider>
              <Base />
            </GoalsProvider>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="add-transaction" element={<AddTransactionPage />} />
          <Route path="bills" element={<Bills />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="goals" element={<Goals />} />
          <Route path="goals/create/:type" element={<GoalsDetails />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="settings" element={<Settings />} />
          <Route path="budget-details" element={<BudgetDetails />} />
          <Route path="category-details" element={<CategoryDetails />} />
        </Route>
      </Routes>
    </TransactionsProvider>
  );
}

export default App;
