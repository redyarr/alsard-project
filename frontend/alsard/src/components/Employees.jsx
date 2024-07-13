import { useAuth } from './AuthContext';
import { useEffect, useState } from 'react';

const Employees = () => {
  const { authState } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.employees);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [users]);

  async function deleteUser(id) {
    try {
      const response = await fetch(`http://localhost:3000/deleteEmployee/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  }

  return (
    <>
      <div >
        {users.length === 0 ? (
          <h1 className='text-3xl text-center mt-5 text-red-600 font-bold'>No Employees Found</h1>
        ) : (
          <div>
            {users.map((user) => (
            <section  key={user.Id} className='inline-block mr-5 mb-5'>   
              <div className='mt-5 text-black inline-block mx-auto max-w-8xl xl:px-6 2xl:px-20 flex'>
                <div className='w-[300px] h-[250px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
                  <div className='flex gap-2'>
                    <h1 className='text-xl font-bold'>{user.Name}</h1>
                  </div>
                  <div>
                    <p className='font-medium'>{user.Email}</p>
                    <p className='font-medium'>{user.department}</p>
                    <p className='font-medium'>{user.Phone}</p>
                    <p className='font-medium'>{user.employeeId}</p>
                    <p className='font-medium'>{user.Position}</p>
                  </div>
                  {authState.isAuthenticated && (
                    <button
                      className='w-[100px] h-[30px] bg-blue-600 text-white rounded'
                      onClick={() => deleteUser(user.Id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </section>   
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Employees;
