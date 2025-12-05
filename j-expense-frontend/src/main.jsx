import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import App from './App'
import SetDate from './Components/SetDate';
import SetAmount from './Components/setAmount';
import AddTransaction from './Components/Transactions/AddTransaction';
import AddTransactionPage from './pages/AddTransactionPage';
import AddBudget from './Components/Budget/AddBudget';
import SetPeriod from './Components/SetPeriod';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router ={router} /> */}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
