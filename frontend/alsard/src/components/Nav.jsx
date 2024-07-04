import React from 'react'
import {NavLink} from "react-router-dom"
import Button from './Button'


const Nav = () => {
const navLinks=[
    {link:"Home", path:"/"},
    {link:"Add Employee", path:"/adduser"},
    {link:"Employee", path:"/user"},
    {link:"Add Item", path:"/additems"},
]


  return (
        <>
        <nav className=' bg-transparent text-black items-center flex justify-between mx-auto max-w-8xl p-5  xl:px-6 2xl:px-20 flex'>
            <div>
                <h1 className='font-bold text-3xl text-blue-600'>logo</h1>
            </div>

            <div>
                <input placeholder='Search Here' className='w-[400px] h-8 bg-transparent ring-1 ring-gray-500 focus:ring-blue-600 rounded-lg outline-none p-2 text-xs  cancel' type="search" />
            </div>

            <div>
                <ul className='flex gap-10'>
                {navLinks.map((items, index)=>{
                    return(<NavLink to={items.path} key={index}> {items.link} </NavLink>)
                })}
                </ul>
            </div>

            <div>
                <Button text={"Log In"} />
            </div>
        </nav>
        </>
  )
}

export default Nav
