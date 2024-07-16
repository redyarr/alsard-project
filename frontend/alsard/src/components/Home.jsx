import { useEffect, useState } from 'react';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredUsers = users.filter(user =>
    user.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredItems = items.filter(item =>
    item.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='left-0 ml-48 mt-5 text-black  w-[80rem] max-w-8xl xl:pl-0 2xl:px-10 flex flex-col'>
      <input
        type="text"
        placeholder="Search by Item & Employee name..."
        value={searchQuery}
        className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <br />
      {searchQuery === '' ? (
        <>
          <div>
          <h1 className='text-2xl text-black font-bold '>Users</h1>
          <br />
          {users.map((user) => (
                  <section  key={user.Id} className='inline-block mr-5 mb-5'>   
                    <div>
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
                    </div>
                  </section>   
                  ))}
          </div>
          <div>

          <br />
          <br />
        <hr />
        <br />
        <br />

        <h1 className='text-2xl text-black font-bold '>Items</h1>
        <br />
        {items.map((item) => (
                  <section  key={item.Id} className='inline-block mr-5 mb-5'>   
                    <div>
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
                    </div>
                  </section>   
                  ))}
          </div>
        </>
      ) : (
        <>
          {filteredUsers.length > 0 && (
            <div>
      <br />
      <h1 className='text-2xl text-black font-bold '>Users</h1>
      <br />
      {filteredUsers.map((user) => (
                  <section  key={user.Id} className='inline-block mr-5 mb-5'>   
                    <div>
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
                    </div>
                  </section>   
                  ))}
            </div>
          )}
          {filteredItems.length > 0 && (
            <div>
              <br />
      <h1 className='text-2xl text-black font-bold '>Items</h1>
      <br />
      {filteredItems.map((item) => (
                  <section  key={item.Id} className='inline-block mr-5 mb-5'>   
                    <div>
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
                    </div>
                  </section>   
                  ))}
            </div>
          )}
          {filteredUsers.length === 0 && filteredItems.length === 0 && <p className='text-2xl font-bold text-red-600'>No results found</p>}
        </>
      )}
    </div>
  );
};

export default Home;