import React from 'react';
import User from './User';

const UserFetching = ({ users, deleteData }) => {
  return (
    <div >
      {users.map((user,) => (
        <section key={user.Id} className='inline-block mr-5 mb-5'>
          <User
            key={user.Id}
            id={user.Id}
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
