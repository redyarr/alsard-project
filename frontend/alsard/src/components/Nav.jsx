import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import { useAuth } from './AuthContext';

const Nav = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { logout, authState } = useAuth();

  const navLinks = [
    { link: 'Home', path: '/' },
    { link: 'Add Employee', path: '/adduser' },
    { link: 'Employees', path: '/user' },
    { link: 'Add Item', path: '/additems' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 left-0 w-full z-10 text-black flex justify-between items-center mx-auto max-w-8xl p-5 xl:px-6 2xl:px-20 ${isSticky ? 'bg-white border-b-2 border-gray-300' : 'bg-transparent'}`}>
      <div>
        <h1 className='font-bold text-3xl text-blue-600'>Logo</h1>
      </div>
      <div>
        <input
          name='search'
          placeholder='Search Here'
          className='w-[400px] h-8 bg-transparent ring-1 ring-gray-500 focus:ring-blue-600 rounded-lg outline-none p-2 text-xs'
          type='search'
        />
      </div>
      <nav>
        <ul className='flex gap-10'>
          {navLinks.map((items, index) => (
            <li key={index} className='relative'>
              <NavLink
                to={items.path}
                activeclassname="active"
                className='nav-link font-medium'
              >
                {items.link}
              </NavLink>
              <span className='underlinee'></span>
            </li>
          ))}
        </ul>
      </nav>
      <div>

        {authState.isAuthenticated ? 
        <>
        <button onClick={logout}>log out</button> 
        <p>Admin</p>
        </>
        : 
        
        <Link to='/login'>
          <Button text='Log In' />
        </Link>
        }

      </div>
    </header>
  );
};

export default Nav;
