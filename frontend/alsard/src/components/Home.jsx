// Home.js
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import FilterComponent from './FilterComponent';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState([
    { name: 'employees', label: 'Employees', checked: false },
    { name: 'items', label: 'Items', checked: false },
  ]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (index) => {
    const newFilters = [...filters];
    newFilters[index].checked = !newFilters[index].checked;
    setFilters(newFilters);
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
                <h1 className='text-2xl text-black font-bold'>{t('home.users')}</h1>
                <br />
                {filteredUsers.map((user) => (
                  <NavLink to={`/employees/${user.Id}`} key={user.Id}>
                    <section className='hover:scale-105 transition duration-300 inline-block mr-5 mb-5'>
                      <div className='w-[300px] h-[190px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
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
                <h1 className='text-2xl text-black font-bold'>{t('home.items')}</h1>
                <br />
                {filteredItems.map((item) => (
                  <NavLink to={`/items/${item.Id}`} key={item.Id}>
                    <section className='hover:scale-105 transition duration-300 inline-block mr-5 mb-5'>
                      <div className='w-[300px] h-[240px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
                        <div className='flex gap-2'>
                          <h1 className='text-xl font-bold'>{item.Name}</h1>
                        </div>
                        <div>
                          <p className='font-medium'>{item.Description}</p>
                          <p className='font-medium'>{item.Category}</p>
                          <p className='font-medium'>{item.model}</p>
                          <p className='font-medium'>{item.tagId}</p>
                          <p className='font-medium'>{item.company}</p>
                          <p className='font-medium'>{item.subLocation}</p>
                          <p className='font-medium'>{item.reserved}</p>
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
    </>
  );
};

export default Home;
