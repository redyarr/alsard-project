
import { useState, lazy } from 'react';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import CreateUser from './components/CreateUser'
import User from './components/User'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import AddItems from './components/AddItems'
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login'




export default function App() {
  const [userData, setUserData]=useState([])
  
  

  

  function addData(note){
    setUserData(prev=>{
      return [note, ...prev]
    })
    }


    function deleteData(id){
      setUserData(prevValue=>{
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
      <Route path='/adduser' element={<CreateUser onAdd={addData} />} />
      <Route path='/user' element={userData.map((userdata, index) =>{
          return (
          <User 
          key={index}
          name={userdata.name} 
          email={userdata.email} 
          department={userdata.department}
          phone={userdata.phone}
          UserID={userdata.UserID}
          position={userdata.position}
          delete={deleteData}
          id={index}

          />
          );
          })} />
          <Route path='/additems' element={<AddItems />} />
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<NotFound />} />
    </Routes>
</AuthProvider>
  )


}