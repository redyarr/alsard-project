import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPrint } from "react-icons/fa";


const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState();
  console.log(employee);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employees/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee');
        }
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee:', error.message);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (

    <>
    <div className='flex justify-between mt-5 text-black mx-auto max-w-8xl xl:px-6 2xl:px-20'>
          <div>
            <h1>{employee.Name}</h1>
            <p>Email: {employee.Email}</p>
            <p>Department: {employee.department}</p>
            <p>Phone: {employee.Phone}</p>
            <p>Employee ID: {employee.employeeId}</p>
            <p>Position: {employee.Position}</p>
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

export default EmployeeDetail;
