import React, { useState, useEffect, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import { useAuth } from './AuthContext';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import { Field, Select, Popover, Transition } from '@headlessui/react';

const Nav = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { logout, authState } = useAuth();
  const { t, i18n } = useTranslation();

  const navLinks = [
    { link: t('navbar.home'), path: '/' },
    { link: t('navbar.employees'), path: '/employees' },
    { link: t('navbar.addEmployees'), path: '/addemployees' },
    { link: t('navbar.items'), path: '/items' },
    { link: t('navbar.addItems'), path: '/additems' },
    { link: t('navbar.reservedItems'), path: '/reserved' },
    { link: t('navbar.addReservedItems'), path: '/addreserved' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    if (lng === 'ku') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  };

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
    <header id='navbar' className={`sticky top-0 left-0 w-full z-10 text-black flex justify-between items-center mx-auto max-w-8xl p-5 xl:px-6 2xl:px-20 ${isSticky ? 'bg-white border-b-2 border-gray-300' : 'bg-transparent'}`}>
      <div className='flex gap-10 justify-center items-center'>
        <div>
          <h1 className='font-bold text-3xl text-blue-600'>AlSard</h1>
        </div>

        <nav className='mt-3'>
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

      </div>
      <div className={`${i18n.language === 'en' ? 'ml-72 mb-2 flex items-center w-9 h-22' : 'mr-[20rem] mb-2 flex items-center w-9 h-22'}`}>
        <div className="w-full rounded-lg">
          <Field>
            <div className="relative">
              <Select
                className='mt-3 block cursor-pointer appearance-none rounded-md border-none bg-blue-600 text-white py-1.5 px-2 focus:outline-none'
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language} // Ensure the selected language is reflected in the dropdown
              >
                <option value="en">EN</option>
                <option value="ku">KU</option>
              </Select>
            </div>
          </Field>
        </div>
      </div>
      <div>

        {authState.isAuthenticated ?
          <>
            <div>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`
                      ${open ? 'text-white' : 'text-white/90'}
                      group inline-flex items-center rounded-md bg-blue-600 hover:bg-blue-700 px-1 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                    >
                      <span>{t('navbar.admin')}</span>
                      <ChevronDownIcon
                        className={`${open ? 'rotate-180 transition' : ''}
                        mx-1 h-5 w-5 transition duration-150 ease-in-out`}
                        aria-hidden="true"
                      />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-[-16px] z-10 mt-3 px-4 w-[160px]">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                          <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                            <button className='absolute top-2 right-2 w-[100px] h-[35px] bg-red-600 hover:bg-red-700 text-white rounded-md font-medium' onClick={logout}>{t('navbar.logout')}</button>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </>
          :
          <Link to='/login'>
            <Button text={t('navbar.login')} />
          </Link>
        }
      </div>
    </header>
  );
};

export default Nav;
