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
        <nav className=' bg-blue-600 text-white items-center flex justify-between mx-auto max-w-8xl p-5  xl:px-6 2xl:px-20 flex'>
            <div>
                <h1 className='font-bold text-3xl text-white'>logo</h1>
            </div>

            <div>
                <input placeholder='Search Here' className='w-[400px] h-8 bg-transparent ring-1 ring-white rounded-lg outline-none p-2 text-xs  focus:ring-gray-300 cancel' type="search" />
            </div>

            <div>
                <ul className='flex gap-10'>
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
