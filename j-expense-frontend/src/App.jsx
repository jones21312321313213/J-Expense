// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Base from './pages/Base'; 
import Login from './pages/Login';
import Landing from './pages/Landing';

// Import all the pages that will load inside the Base layout
import Dashboard from './pages/Dashboard';
import Budgets from './pages/Budgets';
import Transactions from './pages/Transactions'
import Bills from './pages/Bills'
import Expenses from './pages/Expenses'
import Goals from './pages/Goals'
import ActivityLog from './pages/ActivityLog';
import Settings from './pages/Settings'
import BudgetDetails from './pages/BudgetDetails'
import GoalsDetails from './pages/GoalsDetails'
import CategoryDetails from './pages/CategoryDetails'

function App() {
  return (
    <Routes>
      {/* 1. Public Routes (Change Landing path to avoid conflict) */}
      <Route path="/landing" element={<Landing />} /> {/*will change the path for this later*/}
      <Route path="/login" element={<Login />} />
      
      {/* 2. Protected/Layout Routes (With Sidebar/Base Layout) */}
      {/* The parent path remains "/", meaning this layout loads for all children */}
      <Route path="/" element={<Base />}> 
        
        {/* The Index Route: This loads when the URL is exactly "/". */}
        {/* This will render Dashboard inside the <Outlet /> of Base. */}
        <Route index element={<Dashboard />} /> 
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path = "budgets" element = {<Budgets/>} />
        <Route path = "transactions" element = {<Transactions/>} />
        <Route path = "bills" element = {<Bills/>} />
        <Route path = "expenses" element = {<Expenses/>} />
        <Route path = "goals" element = {<Goals/>} /> 
        
        <Route path="activity-log" element={<ActivityLog />} />
        <Route path="settings" element={<Settings />} />
        <Route path="budget-details" element={<BudgetDetails />} />
        <Route path="goals-details" element={<GoalsDetails />} />
        <Route path="category-details" element={<CategoryDetails />} />
      </Route>
    </Routes>
  );
}

export default App;