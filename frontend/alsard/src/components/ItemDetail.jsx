import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { FaPrint, FaArrowRight } from "react-icons/fa";


const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItems] = useState();
  console.log(item);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/items/${id}/details`);
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


  const handlePrint = () => {
    window.print();
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (

    <>
    <div className='flex gap-72 mt-5 pb-5 text-black mx-auto max-w-8xl xl:px-6 2xl:px-20'>
      <div className='left-0'>
        <NavLink className='w-10 h-10 bg-blue-600 rounded-full items-center flex justify-center' to='/items'>
          <FaArrowRight className='text-white rotate-180' />
        </NavLink>
      </div>

      <div className='w-full max-w-4xl bg-gray-200 p-6 rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>{item.Name}</h1>
        <p className='font-medium mb-2'>Description: {item.Description}</p>
        <p className='font-medium mb-2'>Category: {item.Category}</p>
        <p className='font-medium mb-2'>model: {item.model}</p>
        <p className='font-medium mb-2'>tag ID: {item.tagId}</p>
        <p className='font-medium mb-2'>company: {item.company}</p>
        <p className='font-medium mb-2'>subLocation: {item.subLocation}</p>
        <p className='font-medium mb-2'>reserved: {item.reserved}</p>

        <h2 className='text-xl font-bold mt-6 mb-2'>Reserved By</h2>
        {item.reservedBy === null ? (
          <p>This Item is Not Reserved</p>
        ) : (
          <table className='min-w-full divide-y divide-gray-200 border-2 border-black'>
            <thead>
              <tr className='text-center border-2 border-black'>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>Employee Name</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>Email</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>department</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>Phone</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>employeeId</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>Position</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
                <tr className='text-center'>
                  <td  className='px-6 py-4 whitespace-nowrap border-2 border-black font-medium'>{item.reservedBy.Name}</td>
                  <td className='px-6 py-4 whitespace-nowrap border-2 border-black font-medium'>{item.reservedBy.Email}</td>
                  <td className='px-6 py-4 whitespace-nowrap border-2 border-black font-medium'>{item.reservedBy.department}</td>
                  <td className='px-6 py-4 whitespace-nowrap border-2 border-black font-medium'>{item.reservedBy.Phone}</td>
                  <td className='px-6 py-4 whitespace-nowrap border-2 border-black font-medium'>{item.reservedBy.employeeId}</td>
                  <td className='px-6 py-4 whitespace-nowrap border-2 border-black font-medium'>{item.reservedBy.Position}</td>
                </tr>
            </tbody>
          </table>
        )}

        <div className='mt-6'>
          <button onClick={handlePrint} className='w-[100px] h-[40px] bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium gap-5 p-2 flex items-center'> 
            Print <FaPrint />
          </button>
        </div>
      </div>
    </div>
    </>
  
  );
};

export default ItemDetail;
