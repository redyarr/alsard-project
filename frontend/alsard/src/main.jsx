import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext.jsx'
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>,
)

// Authors: Rekar Jamal Najm ,Redyar Hawzhin rauf.
// Date: 2024-7-7
// Description: This is a simple inventory management system that allows you to add employees, items, and reserve items for employees.
//              It also allows you to view all employees and items, and view the items that an employee is using.
//              It also allows you to delete items and employees, and update items and employees.
//              It also allows you to search for an employee and view all the items that he is using.
