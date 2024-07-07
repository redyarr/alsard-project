
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
import RecervedItems from './components/RecervedItems';
import FetchingItems from './components/FetchingItems';
import Items from './components/Items';




export default function App() {
  const [users, setUsers]=useState([])
  const [items, setItems]=useState([])
  

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




  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/items');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setItems(data.Items);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [items]);
  

      
    async function deleteItems(id){
      try {
        const response = await fetch(`http://localhost:3000/deleteItems/${id}`, {
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
      <Route path='items' element={<FetchingItems items={items} deleteItems={deleteItems} />} />
      <Route path='/additems' element={<AddItems />} />
      <Route path='/reserved' element={<RecervedItems />} />
      <Route path='/login' element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
</AuthProvider>
  )


}