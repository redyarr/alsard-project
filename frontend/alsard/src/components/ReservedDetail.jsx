import { useEffect, useState } from 'react';
import { useParams,NavLink } from 'react-router-dom';
import { FaPrint, FaArrowRight } from "react-icons/fa";

const ReservedDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  console.log(details);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/reservedItems/${id}/detail`);
        if (!response.ok) {
          throw new Error('Failed to fetch reserved item details');
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching reserved item details:', error.message);
      }
    };

    fetchDetails();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className='flex gap-72 mt-5 pb-5 text-black mx-auto max-w-8xl xl:px-6 2xl:px-20'>
      <div className='left-0'>
        <NavLink className='w-10 h-10 bg-blue-600 rounded-full items-center flex justify-center' to='/reserved'>
          <FaArrowRight className='text-white rotate-180' />
        </NavLink>
      </div>

      <div className='w-full max-w-4xl bg-gray-200 p-6 rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>{details.reservedItem.item.name}</h1>
        <p className='font-medium mb-2'>Description: {details.reservedItem.item.description}</p>
        <p className='font-medium mb-2'>Category: {details.reservedItem.item.category}</p>
        <p className='font-medium mb-2'>Model: {details.reservedItem.item.model}</p>
        <p className='font-medium mb-2'>Tag ID: {details.reservedItem.item.tagId}</p>
        <p className='font-medium mb-2'>Company: {details.reservedItem.item.company}</p>
        <p className='font-medium mb-2'>Sub-Location: {details.reservedItem.item.SubLocation}</p>
        <p className='font-medium mb-2'>Reserved: {details.reservedItem.item.reserved}</p>

        <br />
        <p className='mb-2'>reserved by:</p>
        <h1 className='text-xl font-bold mb-4'>{details.reservedItem.employee.name}</h1>
        <p className='font-medium mb-2'>Email: {details.reservedItem.employee.email}</p>
        <p className='font-medium mb-2'>Phone: {details.reservedItem.employee.phone}</p>
        <p className='font-medium mb-2'>Department: {details.reservedItem.employee.department}</p>
        <p className='font-medium mb-2'>Position: {details.reservedItem.employee.position}</p>
        <p className='font-medium mb-2'>employee ID: {details.reservedItem.employee.employeeId}</p>
        
<br />
        <p>Other Items Reserved by <span className='font-bold'> {details.reservedItem.employee.name} </span> </p>
        <br />
          <table className='min-w-full divide-y divide-gray-200 border-2 border-black'>
            <thead>
              <tr className='text-center border-2 border-black'>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>Name</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>Description</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>Category</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>Model</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>Tag Id</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>Company</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>Sub Location </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
            {details.otherReservedItems.map((item) => (
              <tr key={item.id}>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.name}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.description}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.category}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.model}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.tagId}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.company}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.subLocation}</td>
              </tr>
            ))}
            </tbody>
          </table>
  

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

export default ReservedDetail;
