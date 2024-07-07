
import { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import AddEmployees from './components/AddEmployees'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import AddItems from './components/AddItems'
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login'
import FetchingEmployees from './components/FetchingEmployees';
import Items from './components/Items';
import RecervedItems from './components/RecervedItems';




export default function App() {
  const [users, setUsers]=useState([])
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.employees);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [users]);
  

  


    async function deleteData(id){
      try {
        const response = await fetch(`http://localhost:3000/deleteEmployee/${id}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
  
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error.message);
      }
      }


  return (

<AuthProvider>
    <Nav />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/employees' element={<FetchingEmployees users={users} deleteData={deleteData} />} />
      <Route path='/addemployees' element={<AddEmployees />} />
      <Route path='items' element={<Items />} />
      <Route path='/additems' element={<AddItems />} />
      <Route path='/reserved' element={<RecervedItems />} />
      <Route path='/login' element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
</AuthProvider>
  )


}