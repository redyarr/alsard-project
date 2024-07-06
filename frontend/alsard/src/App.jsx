
import { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import CreateUser from './components/CreateUser'
import User from './components/User'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import AddItems from './components/AddItems'
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login'
import UserFetching from './components/UserFetching';




export default function App() {
  const [users, setUsers]=useState([])
  console.log(users);
  

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
  }, []);
  

  


    function deleteData(id){
      setUsers(prevValue=>{
        return prevValue.filter((noteItem, index)=>{
          return index!==id;
        })
      })
      }


  return (

<AuthProvider>
    <Nav />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/adduser' element={<CreateUser />} />
      <Route path='/user' element={<UserFetching users={users} deleteData={deleteData} />} />
          <Route path='/additems' element={<AddItems />} />
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<NotFound />} />
    </Routes>
</AuthProvider>
  )


}