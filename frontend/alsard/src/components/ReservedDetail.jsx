import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPrint } from "react-icons/fa";


const ReservedDetail = () => {
  const { id } = useParams();
  const [reserved, setReserved] = useState();
  console.log(reserved);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/reservedItems/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reserved');
        }
        const data = await response.json();
        setReserved(data);
      } catch (error) {
        console.error('Error fetching reserved:', error.message);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!reserved) {
    return <div>Loading...</div>;
  }

  return (

    <>
    <div className='flex justify-between mt-5 text-black mx-auto max-w-8xl xl:px-6 2xl:px-20'>
    <section key={reserved.id} className='inline-block mr-5 mb-5'>
              <div className='w-[300px] h-[235px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
        <div className='flex gap-2'>
            <div className='rounded-full w-10 h-10 flex items-center justify-center bg-blue-600 font-bold text-white'>
                {reserved.employee.name.trim().charAt(0).toUpperCase()}
            </div>
            <h1 className='text-xl font-bold'>{reserved.employee.name.trim()}</h1>
        </div>

        <div>
            <p className='font-medium'>{reserved.employee.email}</p>
            <p className='font-medium'>{reserved.employee.phone}</p>
            <br />
            <p>owns:</p>
            <p className='font-medium'>{reserved.item.name}</p>
            <p className='font-medium'>{reserved.item.description}</p>
        </div>       
    </div>
            </section>           


          <div>
              <a href="javascript:if(window.print)window.print()">
                <button className='w-[100px] h-[40px] bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium gap-5 p-2 flex items-center'> 
                  Print <FaPrint />
                </button>
              </a>
          </div>
    </div>
    </>
  
  );
};

export default ReservedDetail;
