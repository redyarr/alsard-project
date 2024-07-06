import React from 'react';
import User from './User';

const UserFetching = ({ users, deleteData }) => {
  return (
    <div>
      {users.map((user) => (
        <section key={user.id} className='inline-block mr-5'>
          <User
            key={user.id}
            name={user.Name}
            email={user.Email}
            department={user.Department}
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

export default UserFetching;
