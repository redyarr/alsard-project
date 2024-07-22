import { useAuth } from './AuthContext';
import { useEffect, useState } from 'react';
import EditEmployeeModal from './EditEmployeeModal';
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Employees = () => {
  const { authState } = useAuth();
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
  }, []);

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

  const filteredUsers = users.filter((user) =>
    user.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className='p-10 text-black w-[80rem] max-w-8xl 2xl:px-20 flex gap-10 items-center'>
        <input
          required
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id="search"
          name="search"
          type="text"
          placeholder={t('home.searchPlaceholder')}
          className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
        />
      </div>
      <br />
      <div className={`left-0 pl-10 text-black w-[93rem] max-w-8xl 2xl:px-10 flex ${isModalOpen ? 'blur-background' : ''}`}>
        {users.length === 0 || filteredUsers.length === 0 ? (
          <h1 className='text-3xl text-center mt-5 text-red-600 font-bold'>{t('home.noUsers')}</h1>
        ) : (
          <div>
            {filteredUsers.map((user) => (
              <section key={user.Id} className='hover:scale-105 transition duration-300 inline-block mr-5 mb-5'>
                <div>
                  <div id='haha' className='w-[300px] h-[260px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg '>
                    <div className='flex items-center gap-2'>
                      <h1 className='text-xl font-bold'>{user.Name.trim()}</h1>
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
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>

                      {authState.isAuthenticated ?
                        <>
                          <div>
                            <button className='w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center' onClick={() => openEditModal(user)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                        </>
                        :
                        <>
                          <div>
                            <button disabled={user.isEditable === false} className={`${user.isEditable === false ? 'bg-gray-300 text-gray-500 w-10 h-10 rounded-full items-center flex justify-center' : 'w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center'}`} onClick={() => openEditModal(user)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                        </>
                      }

                      <div>
                        <NavLink className='w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center' to={`${user.Id}`}>
                          <FaArrowRight />
                        </NavLink>
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
