import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext.jsx'
import i18n from './i18n.js'

const storedLanguage = localStorage.getItem('language') || 'en';
if (storedLanguage === 'ku') {
  document.body.classList.add('font-kurdish');
} else {
  document.body.classList.remove('font-kurdish');
}

i18n.on('languageChanged', (lng) => {
  if (lng === 'ku') {
    document.body.classList.add('font-kurdish');
  } else {
    document.body.classList.remove('font-kurdish');
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
      <div className='main'>
      <div className='gradient'/>
      </div>
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
