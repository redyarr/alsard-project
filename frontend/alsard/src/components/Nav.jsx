import React, {useState, useEffect} from 'react'
import {NavLink} from "react-router-dom"
import Button from './Button'


const Nav = () => {
const[isSticky, setIsSticky] = useState(false);

const navLinks=[
    {link:"Home", path:"/"},
    {link:"Add Employee", path:"/adduser"},
    {link:"Employees", path:"/user"},
    {link:"Add Item", path:"/additems"},
]



useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  return (
        <>
        <nav className={` sticky top-0 left-0 w-full z-10 text-black items-center flex justify-between mx-auto max-w-8xl p-5  xl:px-6 2xl:px-20 ${isSticky ? 'bg-white border-b-2 border-gray-300' : 'bg-transparent'} `}>
            <div>
                <NavLink to={"/"} className='font-bold text-3xl text-blue-600'>logo</NavLink>
            </div>

            <div>
                <input name='search' placeholder='Search Here' className='w-[400px] h-8 bg-transparent ring-1 ring-gray-500 focus:ring-blue-600 rounded-lg outline-none p-2 text-xs  cancel' type="search" />
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
