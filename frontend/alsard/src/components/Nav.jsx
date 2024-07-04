import React from 'react'
import {NavLink} from "react-router-dom"


const Nav = () => {
const navLinks=[
    {link:"Home", path:"/"},
    {link:"Add Employee", path:"/adduser"},
    {link:"Employee", path:"/user"},
    {link:"Add Item", path:"/additems"},
]


  return (
        <>
        <nav className='flex justify-between p-5'>
            <div>
                <h1>logo</h1>
            </div>

            <div>
                <input type="search" />
            </div>

            <div>
                <ul>
                {navLinks.map((items, index)=>{
                    return(<NavLink to={items.path} key={index}> {items.link} </NavLink>)
                })}
                </ul>
            </div>

            <div>
                <button>Log In</button>
            </div>
        </nav>
        </>
  )
}

export default Nav
