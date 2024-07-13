
import { useState, useEffect } from 'react';

const ReservedItems = () => {

    const [reserved, setReserved] = useState([])

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

return (
<>
<div >
{reserved.length === 0 ? <p className='text-3xl text-center mt-5 text-red-600 font-bold'>No Reserved Item Found</p> : 

<div>
     {reserved.map((res) => (
        <section key={res.id} className='inline-block mr-5 mb-5'>
          <div className='w-[300px] h-[270px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
    <div className='flex gap-2'>
        <h1 className='text-xl font-bold'>{res.employee.name}</h1>
    </div>

    <div>
        <p className='font-medium'>{res.employee.email}</p>
        <p className='font-medium'>{res.employee.phone}</p>
        <br />
        <p>owns:</p>
        <p className='font-medium'>{res.item.name}</p>
        <p className='font-medium'>{res.item.description}</p>
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


