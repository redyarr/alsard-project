import { useAuth } from './AuthContext';
import { useEffect, useState } from 'react';


const Items = () => {
    const { authState } = useAuth();
    const [items, setItems] = useState([])


    useEffect(() => {
        const fetchItem = async () => {
          try {
            const response = await fetch('http://localhost:3000/items');
            if (!response.ok) {
              throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setItems(data.items);
          } catch (error) {
            console.error('Error fetching users:', error.message);
          }
        };
    
        fetchItem();
      }, [items]);
    
    
    
      async function deleteItems(id) {
        try {
          const response = await fetch(`http://localhost:3000/deleteItem/${id}`, {
            method: 'DELETE',
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete item');
          }
    
          setItems((prevItems) => prevItems.filter((item) => item.Id !== id));
        } catch (error) {
          console.error('Error deleting item:', error.message);
        }
      }





  return (
<>
<div className='mt-5 text-black  mx-auto max-w-8xl xl:px-6 2xl:px-20 flex'>
        {items.length === 0 ? (
          <h1 className='text-3xl text-center mt-5 text-red-600 font-bold'>No Items Found</h1>
        ) : (
          <div>
            {items.map((item) => (
            <section  key={item.Id} className='inline-block mr-5 mb-5'>   
              <div>
                <div className='w-[300px] h-[280px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
                  <div className='flex gap-2'>
                    <h1 className='text-xl font-bold'>{item.Name}</h1>
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
                  {authState.isAuthenticated && (
                    <button
                      className='w-[100px] h-[30px] bg-blue-600 text-white rounded'
                      onClick={() => deleteItems(item.Id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </section>   
            ))}
          </div>
        )}
      </div>
</>
  )
}

export default Items

