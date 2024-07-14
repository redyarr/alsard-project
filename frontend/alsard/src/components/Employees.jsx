import { useAuth } from './AuthContext';
import { useEffect, useState } from 'react';
import EditEmployeeModal from './EditEmployeeModal';
import { MdDelete, MdEdit } from "react-icons/md";



const Employees = () => {
  const { authState } = useAuth();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const openEditModal = (user) => {
    setSelectedEmployee(user);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`mt-5 text-black mx-auto max-w-8xl xl:px-6 2xl:px-20 flex ${isModalOpen ? 'blur-background' : ''}`}>
        {users.length === 0 ? (
          <h1 className='text-3xl text-center mt-5 text-red-600 font-bold'>No Employees Found</h1>
        ) : (
          <div>
            {users.map((user) => (
              <section key={user.Id} className='inline-block mr-5 mb-5'>
                <div>
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

                    <div id='buttons' className='flex gap-2 mt-4'>
                      <div>
                          {authState.isAuthenticated && (
                            <>
                              <button
                                className='w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center'
                                onClick={() => deleteUser(user.Id)}
                              >
                                <MdDelete className='text-[1.6rem]' />
                              </button>
                            </>
                          )}
                      </div>

                      <div>
                           <button className='w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center' onClick={() => openEditModal(user)}>
                           <MdEdit className='text-[1.6rem]'/>
                            </button>
                      </div>      
                          
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <EditEmployeeModal employee={selectedEmployee} onClose={closeEditModal} setUsers={setUsers} />
      )}
    </>
  );
};

export default Employees;
