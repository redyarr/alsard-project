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


    

return (
<>
{isLoading? 
<>
<div className='flex items-center justify-center'>
          <div class="flex items-center justify-center w-[5rem] text-center">
              <div role="status">
                  <svg aria-hidden="true" className="w-full mb-5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                  <span class="text-lg font-bold">{t('home.loading')}</span>
              </div>
          </div>
       </div> 
</>:

<>

</>}
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
              <div className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit'>
        <div className='flex gap-2 '>
            {/* <div className='rounded-full w-10 h-10 flex items-center justify-center bg-blue-600 font-bold text-white'>
                {res.employee.name.trim().charAt(0).toUpperCase()}
            </div> */}
            <h1 className='text-xl font-bold break-all'>{res.employee.name.trim()}</h1>
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


