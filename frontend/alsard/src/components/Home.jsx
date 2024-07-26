import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import FilterComponent from './FilterComponent';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState([
    { name: 'employees', label: "Employees", checked: false },
    { name: 'items', label: "Items", checked: false },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const usersResponse = await fetch('http://localhost:3000/employees');
        const itemsResponse = await fetch('http://localhost:3000/items');
        if (!usersResponse.ok || !itemsResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        const usersData = await usersResponse.json();
        const itemsData = await itemsResponse.json();
        setUsers(usersData.employees);
        setItems(itemsData.items);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (index) => {
    setFilters((prevFilters) => {
      return prevFilters.map((filter, i) => ({
        ...filter,
        checked: i === index ? !filter.checked : false,
      }));
    });
  };

  const filteredUsers = users.filter(user =>
    user.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredItems = items.filter(item =>
    item.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showEmployees = filters.find(filter => filter.name === 'employees')?.checked;
  const showItems = filters.find(filter => filter.name === 'items')?.checked;

  const displayUsers = !showEmployees && !showItems || showEmployees;
  const displayItems = !showEmployees && !showItems || showItems;

  return (
    <>
      {isLoading ?
        <div className='flex items-center justify-center'>
          <div className="flex items-center justify-center w-[5rem] text-center">
            <div role="status">
              <svg aria-hidden="true" className="w-full mb-5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
              <span className="text-lg font-bold">{t('home.loading')}</span>
            </div>
          </div>
        </div>
        :
        <div>
          <div className='p-10 text-black w-[80rem] max-w-8xl 2xl:px-20 flex gap-10 items-center'>
            <input
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search"
              name="search"
              type="text"
              placeholder={t('home.searchPlaceholder')}
              className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
            <div className='text-black max-w-8xl 2xl:px-10'>
              <FilterComponent filters={filters} handleFilterChange={handleFilterChange} />
            </div>
          </div>
          <br />
          <div className='left-0 px-10 text-black w-[93rem] max-w-8xl 2xl:px-20 flex flex-col'>
            {displayUsers && (
              <div>
                {filteredUsers.length === 0 ? (
                  <p className='text-2xl font-bold text-red-600'>{t('home.noUsers')}</p>
                ) : (
                  <>
                    <h1 className='text-2xl text-black font-bold'>{t('navbar.employees')}</h1>
                    <br />
                    {filteredUsers.map((user) => (
                      <NavLink to={`/employees/${user.Id}`} key={user.Id}>
                        <section id='haha' className='hover:scale-105 transition duration-300 inline-block mr-5 mb-5'>
                          <div className='w-[330px] h-[190px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
                            <div className='flex gap-2'>
                              <h1 className='text-xl font-bold'>{user.Name}</h1>
                            </div>
                            <div>
                              <p className='text-sm'>{t('home.name')}: <span className='font-medium'>{user.Email}</span></p>
                              <p className='text-sm'>{t('home.department')}: <span className='font-medium'>{user.department}</span></p>
                              <p className='text-sm'>{t('home.phone')}: <span className='font-medium'>{user.Phone}</span></p>
                              <p className='text-sm'>{t('home.employeeId')}: <span className='font-medium'>{user.employeeId}</span></p>
                              <p className='text-sm'>{t('home.position')}: <span className='font-medium'>{user.Position}</span></p>
                            </div>
                          </div>
                        </section>
                      </NavLink>
                    ))}
                  </>
                )}
              </div>
            )}
            {displayItems && (
              <div>
                {filteredItems.length === 0 ? (
                  <p className='text-2xl font-bold text-red-600'>{t('home.noItems')}</p>
                ) : (
                  <>
                    <h1 className='text-2xl text-black font-bold'>{t('navbar.items')}</h1>
                    <br />
                    {filteredItems.map((item) => (
                      <NavLink to={`/items/${item.Id}`} key={item.Id}>
                        <section id='haha' className='hover:scale-105 transition duration-300 inline-block mr-5 mb-5'>
                          <div className='w-[330px] h-[240px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
                            <div className='flex gap-2'>
                              <h1 className='text-xl font-bold'>{item.Name}</h1>
                            </div>
                            <div>
                              <p className='text-sm'>{t('home.description')}: <span className='font-medium'>{item.Description}</span></p>
                              <p className='text-sm'>{t('home.category')}: <span className='font-medium'>{item.Category}</span></p>
                              <p className='text-sm'>{t('home.model')}: <span className='font-medium'>{item.model}</span></p>
                              <p className='text-sm'>{t('home.tagId')}: <span className='font-medium'>{item.tagId}</span></p>
                              <p className='text-sm'>{t('home.company')}: <span className='font-medium'>{item.company}</span></p>
                              <p className='text-sm'>{t('home.subLocation')}: <span className='font-medium'>{item.subLocation}</span></p>
                              <p className='text-sm'>{t('home.reserved')}: <span className='font-medium'>{item.reserved}</span></p>
                            </div>
                          </div>
                        </section>
                      </NavLink>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default Home;
