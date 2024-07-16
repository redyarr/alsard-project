import { useAuth } from './AuthContext';
import { useState, useEffect } from 'react';


const ReservedItems = () => {
  const { authState } = useAuth();
  const [reserved, setReserved] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchReservedItems = async () => {
          try {
            const response = await fetch('http://localhost:3000/employeeItems');
            if (!response.ok) {
              throw new Error('Failed to fetch employee items');
            }
            const data = await response.json();
            setReserved(data);
          } catch (error) {
            console.error('Error fetching employee items:', error.message);
          }
        };
    
        fetchReservedItems();
      }, [reserved]);


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
    <div className='left-0 ml-48 mt-5 text-black  w-[80rem] max-w-8xl xl:pl-0 2xl:px-10 flex'>
                  <input
                      required
                      value={searchTerm}
                      onChange={(e)=>{setSearchTerm(e.target.value)}}
                      id="search"
                      name="search"
                      type="text"
                      placeholder='search by name...'
                      className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  />
    </div>
<br />
    <div className='left-0 ml-48 mt-5 text-black  w-[80rem] max-w-8xl xl:pl-0 2xl:px-10 flex'>
    {reserved.length === 0 || filteredReservedItems.length === 0  ? <p className='text-3xl text-center mt-5 text-red-600 font-bold'>No Reserved Item Found</p> : 

    <div>
        {filteredReservedItems.map((res) => (
            <section key={res.id} className='inline-block mr-5 mb-5'>
              <div className='w-[300px] h-[270px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
        <div className='flex gap-2'>
            <div className='rounded-full w-10 h-10 flex items-center justify-center bg-blue-600 font-bold text-white'>
                {res.employee.name.trim().charAt(0).toUpperCase()}
            </div>
            <h1 className='text-xl font-bold'>{res.employee.name.trim()}</h1>
        </div>

        <div>
            <p className='font-medium'>{res.employee.email}</p>
            <p className='font-medium'>{res.employee.phone}</p>
            <br />
            <p>owns:</p>
            <p className='font-medium'>{res.item.name}</p>
            <p className='font-medium'>{res.item.description}</p>
        </div>
        {authState.isAuthenticated && (
                                <>
                                  <button
                                    className='w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center'
                                    onClick={() => deleteItems(item.Id)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>                               </button>
                                </>
                              )}
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


