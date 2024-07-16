import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

    
    <div>
      <h1>{employee.Name}</h1>
      <p>Email: {employee.Email}</p>
      <p>Department: {employee.department}</p>
      <p>Phone: {employee.Phone}</p>
      <p>Employee ID: {employee.employeeId}</p>
      <p>Position: {employee.Position}</p>
    </div>
  );
};

export default EmployeeDetail;
