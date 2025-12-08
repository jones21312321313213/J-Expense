import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import App from './App'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import CategoryCard from './Components/Category/CategoryCard';
import EditBudget from './Components/Budget/EditBudget';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router ={router} /> */}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
