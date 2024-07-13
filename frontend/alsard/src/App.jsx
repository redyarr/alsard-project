
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AddEmployees from './components/AddEmployees'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import AddItems from './components/AddItems'
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login'
import FetchingEmployees from './components/FetchingEmployees';
import FetchingItems from './components/FetchingItems';
import FetchingReserved from './components/FetchingReserved';
import AddReservedItems from './components/AddReservedItems';




export default function App() {
  const [users, setUsers] = useState([])
  const [items, setItems] = useState([])
  const [reserved, setReserved] = useState([])
  console.log(reserved);
  

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



  async function deleteData(id) {
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
    const fetchItem = async () => {
      try {
        const response = await fetch('http://localhost:3000/items');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchItem();
  }, [items]);



  async function deleteItems(id) {
    try {
      const response = await fetch(`http://localhost:3000/deleteItem/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setItems((prevItems) => prevItems.filter((item) => item.Id !== id));
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  }


  useEffect(() => {
    const fetchReservedItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/employeeItems');
        if (!response.ok) {
          throw new Error('Failed to fetch employee items');
        }
        const data = await response.json();
        setReserved(data);
      } catch (error) {
        console.error('Error fetching employee items:', error.message);
      }
    };

    fetchReservedItems();
  }, [reserved]);






  return (

    <AuthProvider>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/employees' element={<FetchingEmployees users={users} deleteData={deleteData} />} />
        <Route path='/addemployees' element={<AddEmployees />} />
        <Route path='items' element={<FetchingItems items={items} deleteItems={deleteItems} />} />
        <Route path='/additems' element={<AddItems />} />
        <Route path='/reserved' element={<FetchingReserved reserved={reserved} />} />
        <Route path='/addreserved' element={<AddReservedItems />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )


}