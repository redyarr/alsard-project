import { useAuth } from './AuthContext';
import { useEffect, useState } from 'react';
import EditEmployeeModal from './EditEmployeeModal';
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Employees = () => {
  const { authState } = useAuth();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.employees);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }finally{
        setIsLoading(false);
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
      window.location.reload();
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.message);
      alert(`Error deleting user: ${error.message}`);
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
    {isLoading ? 
    <>
        <div className='flex items-center justify-center'>
          <div className="flex items-center justify-center w-[5rem] text-center">
              <div role="status">
                  <svg aria-hidden="true" className="w-full mb-5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                  <span className="text-lg font-bold">{t('home.loading')}</span>
              </div>
          </div>
       </div>
    </>
    :
    
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
      <div className={`left-0 px-10 text-black w-[93rem] max-w-8xl 2xl:px-10 flex ${isModalOpen ? 'blur-background' : ''}`}>
        {users.length === 0 || filteredUsers.length === 0 ? (
          <h1 className='text-3xl text-center mt-5 text-red-600 font-bold'>{t('home.noUsers')}</h1>
        ) : (
          <div>
            {filteredUsers.map((user) => (
              <section key={user.Id} className='hover:scale-105 transition duration-300 inline-block mr-5 mb-5'>
                <div>
                  <div id='haha' className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit'>
                    <div className='flex items-center gap-2 '>
                      <h1 className='text-xl font-bold break-all'>{user.Name.trim()}</h1>
                    </div>
                    <div>
                      <p className='text-[15px]'>{t('home.email')}: <span className='font-medium break-all'>{user.Email}</span></p>
                      <p className='text-[15px]'>{t('home.department')}: <span className='font-medium'>{user.department}</span></p>
                      <p className='text-[15px]'>{t('home.phone')}: <span className='font-medium'>{user.Phone}</span></p>
                      <p className='text-[15px]'>{t('home.employeeId')}: <span className='font-medium'>{user.employeeId}</span></p>
                      <p className='text-[15px]'>{t('home.position')}: <span className='font-medium'>{user.Position}</span></p>
                    </div>

                    <div id='buttons' className='flex gap-2 mt-6'>
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
    </>}
    </>
  );
};

export default Employees;
