import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPrint } from "react-icons/fa";


const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItems] = useState();
  console.log(item);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/items/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching employee:', error.message);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (

    <>
    <div className='flex justify-between mt-5 text-black mx-auto max-w-8xl xl:px-6 2xl:px-20'>
          <div className='w-[300px] h-[265px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
                    <div className='flex gap-2'>
                       <div className='rounded-full w-10 h-10 flex items-center justify-center bg-blue-600 font-bold text-white'>
                          {item.Name.trim().charAt(0).toUpperCase()}
                        </div>
                      <h1 className='text-xl font-bold'>{item.Name.trim()}</h1>
                    </div>
                    <div>
                      <p className='font-medium'>{item.Description}</p>
                      <p className='font-medium'>{item.Category}</p>
                      <p className='font-medium'>{item.model}</p>
                      <p className='font-medium'>{item.tagId}</p>
                      <p className='font-medium'>{item.company}</p>
                      <p className='font-medium'>{item.subLocation}</p>
                      <p className='font-medium'>{item.reserved}</p>
                    </div>
          </div>              


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

export default ItemDetail;
