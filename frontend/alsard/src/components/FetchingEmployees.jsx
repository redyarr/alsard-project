import React from 'react';
import Employees from './Employees';

const FetchingEmployees = ({ users, deleteData }) => {
  return (
    <div >
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
  );
};

export default FetchingEmployees;
