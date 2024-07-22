
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AddEmployees from './components/AddEmployees'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import AddItems from './components/AddItems'
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './components/Login'
import AddReservedItems from './components/AddReservedItems';
import ReservedItems from './components/ReservedItems';
import Employees from './components/Employees';
import Items from './components/Items';
import EmployeeDetail from './components/EmployeeDetail';
import ItemDetail from './components/ItemDetail';
import ReservedDetail from './components/ReservedDetail';

export default function App() {
const {authState}=useAuth();
  return (

    <AuthProvider>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/employees' element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} /> 
        <Route path='/addemployees' element={<AddEmployees />} />
        <Route path='items' element={<Items  />} />
        <Route path='/items/:id' element={<ItemDetail />} />
        <Route path='/additems' element={<AddItems />} />
        <Route path='/reserved' element={<ReservedItems/>} />
        <Route path='/reserved/:id' element={<ReservedDetail />} />
        <Route path='/addreserved' element={<AddReservedItems />} />
        {authState.isAuthenticated ? null :<Route path='/login' element={<Login />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )


}