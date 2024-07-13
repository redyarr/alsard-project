import React from 'react';
import Employees from './Employees';

const FetchingEmployees = ({ users, deleteData }) => {
  return (
    <div >
     {users.length === 0 ? <p className='p-5 text-2xl text-red-600 font-bold'>No Employee Found</p> : 
     
    <div>
    {users.map((user,) => (
      <section key={user.Id} className='inline-block mr-5 mb-5'>
        <Employees
          key={user.Id}
          id={user.Id}
          name={user.Name}
          email={user.Email}
          department={user.department}
          phone={user.Phone}
          UserID={user.employeeId}
          position={user.Position}
          delete={deleteData}
        />
      </section>
    ))}
    </div>
    }

     
    </div>
  );
};

export default FetchingEmployees;
