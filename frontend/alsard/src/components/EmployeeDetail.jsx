import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPrint } from "react-icons/fa";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employee/${id}/details`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee details:', error.message);
        setError('Error fetching employee details');
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center mt-5 text-black mx-auto max-w-8xl xl:px-6 2xl:px-20'>
      <div className='w-full max-w-4xl bg-gray-200 p-6 rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>{employee.Name}</h1>
        <p className='font-medium mb-2'>Email: {employee.Email}</p>
        <p className='font-medium mb-2'>Department: {employee.department}</p>
        <p className='font-medium mb-2'>Phone: {employee.Phone}</p>
        <p className='font-medium mb-2'>Employee ID: {employee.employeeId}</p>
        <p className='font-medium mb-2'>Position: {employee.Position}</p>

        <h2 className='text-xl font-bold mt-6 mb-2'>Reserved Items</h2>
        {employee.reservedItems.length === 0 ? (
          <p>No reserved items</p>
        ) : (
          <table className='min-w-full divide-y divide-gray-200'>
            <thead>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Model</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tag ID</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Company</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {employee.reservedItems.map(item => (
                <tr key={item.Id}>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.Name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.Category}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.model}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.tagId}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className='mt-6'>
          <a href="javascript:if(window.print)window.print()">
            <button className='w-[100px] h-[40px] bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium gap-5 p-2 flex items-center'> 
              Print <FaPrint />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
