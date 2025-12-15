// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Base from './pages/Base'; 
import Login from './pages/Login';
import Landing from './pages/Landing';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ForgotPasswordVerificationCode from './pages/ForgotPassword/ForgotPasswordVerificationCode';
import ForgotPasswordChangePassword from './pages/ForgotPassword/ForgotPasswordChangePassword';
import ForgotPasswordSuccess from './pages/ForgotPassword/ForgotPasswordSuccess';

// Pages inside Base
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
import EditSettingsAccount from './Components/Settings/EditSettingsAccount';
import EditCategory from './Components/Category/EditCategory';
import EditTransaction from './Components/Transactions/EditTransaction';

function App() {
  // hhuhu
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/verify" element={<ForgotPasswordVerificationCode />} />
      <Route path="/forgot-password/change-password" element={<ForgotPasswordChangePassword />} />
      <Route path="/forgot-password/success" element={<ForgotPasswordSuccess />} />

      {/* ================= APP / PROTECTED ROUTES ================= */}
      <Route path="/app" element={<Base />}>
        {/* default → /app */}
        <Route index element={<Dashboard />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="budgets" element={<Budgets />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="add-transaction" element={<AddTransactionPage />} />
        <Route path="edit-transaction" element={<EditTransaction />} />
        <Route path="bills" element={<Bills />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="goals" element={<Goals />} />
        <Route path="activity-log" element={<ActivityLog />} />
        <Route path="settings" element={<Settings />} />
        <Route path="edit-settings-account" element={<EditSettingsAccount />} />
        <Route path="budget-details" element={<BudgetDetails />} />
        <Route path="goals/:id" element={<GoalsDetails />} />
        <Route path="category-details" element={<CategoryDetails />} />
        <Route path="edit-category" element={<EditCategory />} />
        <Route path="edit-category/:id" element={<EditCategory />} />
      </Route>
    </Routes>
  );
}

export default App;
