
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AddEmployees from './components/AddEmployees'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import AddItems from './components/AddItems'
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login'
import AddReservedItems from './components/AddReservedItems';
import ReservedItems from './components/ReservedItems';
import Employees from './components/Employees';
import Items from './components/Items';
import EmployeeDetail from './components/EmployeeDetail';




export default function App() {
  

  return (

    <AuthProvider>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/employees' element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} /> 
        <Route path='/addemployees' element={<AddEmployees />} />
        <Route path='items' element={<Items  />} />
        <Route path='/additems' element={<AddItems />} />
        <Route path='/reserved' element={<ReservedItems/>} />
        <Route path='/addreserved' element={<AddReservedItems />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )


}