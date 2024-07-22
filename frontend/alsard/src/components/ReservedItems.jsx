import { useAuth } from './AuthContext';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


const ReservedItems = () => {
  const { authState } = useAuth();
  const [reserved, setReserved] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReservedItems = async () => {
          try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3000/employeeItems');
            if (!response.ok) {
              throw new Error('Failed to fetch employee items');
            }
            const data = await response.json();
            setReserved(data);
          } catch (error) {
            console.error('Error fetching employee items:', error.message);
          }finally{
            setIsLoading(false);
          }
        };
    
        fetchReservedItems();
      }, []);


      const deleteReservedItem = async (id) => {
        try {
          const response = await fetch(`http://localhost:3000/deleteReservedItem/${id}`, {
            method: 'DELETE',
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete reserved item');
          }
    
          setReserved((prevReserved) => prevReserved.filter((item) => item.id !== id));
        } catch (error) {
          console.error('Error deleting reserved item:', error.message);
        }
      };


      const filteredReservedItems = reserved.filter((res) =>
        res.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      );

      if (isLoading) {
        return <div>{t('home.loading')}</div>; // Show loading message
      }
    

return (
<>
    <div className='p-10 text-black w-[80rem] max-w-8xl 2xl:px-20 flex gap-10 items-center'>
                  <input
                      required
                      value={searchTerm}
                      onChange={(e)=>{setSearchTerm(e.target.value)}}
                      id="search"
                      name="search"
                      type="text"
                      placeholder={t("home.searchPlaceholder")}
                      className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  />
    </div>
<br />
    <div className='left-0 px-10 text-black w-[93rem] max-w-8xl 2xl:px-10 flex'>
    {reserved.length === 0 || filteredReservedItems.length === 0  ? <p className='text-3xl text-center mt-5 text-red-600 font-bold'>{t("home.noReservedItem")}</p> : 

    <div>
        {filteredReservedItems.map((res) => (
            <section id='haha' key={res.id} className='hover:scale-105 transition duration-300 inline-block mr-5 mb-5'>
              <div className='w-[300px] h-[270px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
        <div className='flex gap-2'>
            {/* <div className='rounded-full w-10 h-10 flex items-center justify-center bg-blue-600 font-bold text-white'>
                {res.employee.name.trim().charAt(0).toUpperCase()}
            </div> */}
            <h1 className='text-xl font-bold'>{res.employee.name.trim()}</h1>
        </div>

        <div>
            <p className='text-[15px]' >{t("home.email")}: <span className='font-medium'>{res.employee.email}</span></p>
            <p className='text-[15px]' >{t("home.phone")}: <span className='font-medium'>{res.employee.phone}</span></p>
            <br />
            <p className='font-bold mb-2'>{t("home.reserved")}</p>
            <p className='text-[15px]' >{t("home.name")}: <span className='font-medium'>{res.item.name}</span></p>
            <p className='text-[15px]' >{t("home.description")}: <span className='font-medium'>{res.item.description}</span></p>
        </div>
        <div id='buttons' className='flex gap-2 mt-2'>
              {authState.isAuthenticated && (
                  <>
                  <button
                    className='w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center'
                    onClick={() => deleteReservedItem(res.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  </>)}

              <div>
                  <NavLink className='w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center' to={`${res.id}`}>
                  <FaArrowRight />
                  </NavLink>
              </div>  
        </div>
    </div>
            </section>
          ))}
    </div>
    }


    </div>
</>
  )
}

export default ReservedItems


