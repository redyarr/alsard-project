import { useEffect, useState } from 'react';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([])



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


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch('http://localhost:3000/items');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchItem();
  }, [items]);

  
  return (
    <div className='mt-5 text-black mx-auto max-w-8xl   xl:px-6 2xl:px-20 flex  flex-col' >

      <h1 className='text-2xl  font-bold '>Employees</h1>
      <br />
      <div id='empoyees'>
            {users.length === 0 ? (
                <h1 className='text-3xl  mt-5 text-red-600 font-bold'>No Employees Found</h1>
              ) : (
                <div>
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
              )}
      </div>

        <br />
        <hr />
        <br />

      <h1 className='text-2xl text-black font-bold '>Items</h1>
      <br />
      <div id='items'>
            {items.length === 0 ? (
                <h1 className='text-3xl  mt-5 text-red-600 font-bold'>No Items Found</h1>
              ) : (
                <div>
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
              )}
      </div>


    </div>
  )
}

export default Home
