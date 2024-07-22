import { useAuth } from './AuthContext';
import { useEffect, useState } from 'react';
import EditItemModal from './EditItemModal';
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import FilterComponent from './FilterComponent';
import { useTranslation } from 'react-i18next';

const Items = () => {
  const { authState } = useAuth();
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const [filters, setFilters] = useState([
    { name: 'reserved', label: 'Reserved Items', checked: false },
    { name: 'Storage', label: 'Storage Items', checked: false }
  ]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }finally{
        setIsLoading(false);
      }
    };

    fetchItem();
  }, []);

  async function deleteItems(id) {
    try {
      const response = await fetch(`http://localhost:3000/deleteItem/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setItems((prevItems) => prevItems.filter((item) => item.Id !== id));
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  }

  const openEditModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const handleFilterChange = (index) => {
    const newFilters = [...filters];
    newFilters[index].checked = !newFilters[index].checked;
    setFilters(newFilters);
  };

  const filteredItems = items
    .filter((item) =>
      item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subLocation.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) => {
      const showReserved = filters.find(filter => filter.name === 'reserved')?.checked;
      const showStorage = filters.find(filter => filter.name === 'Storage')?.checked;

      if (showReserved && showStorage) {
        return item.reserved === 'yes' || item.reserved === 'no';
      }
      if (showReserved) {
        return item.reserved === 'yes';
      }
      if (showStorage) {
        return item.reserved === 'no';
      }
      return true;
    });

    if (isLoading) {
      return <div>{t('home.loading')}</div>; // Show loading message
    }
  

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
          placeholder='search by name...'
          className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
        />

        <div className='text-black max-w-8xl 2xl:px-10'>
          <FilterComponent filters={filters} handleFilterChange={handleFilterChange} />
        </div>
      </div>
      <br />
      <br />
      <div className={`left-0 px-10 text-black w-[93rem] max-w-8xl 2xl:px-10 flex ${isModalOpen ? 'blur-background' : ''}`}>
        {items.length === 0 || filteredItems.length === 0 ? (
          <h1 className='text-3xl text-center mt-5 text-red-600 font-bold'>{t('home.noItems')}</h1>
        ) : (
          <div>
            {filteredItems.map((item) => (
              <section id="haha" key={item.Id} className='hover:scale-105 transition duration-300 inline-block mr-5 mb-5'>
                <div>
                  <div className='w-[300px] h-[295px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
                    <div className='flex gap-2'>
                      <h1 className='text-xl font-bold'>{item.Name.trim()}</h1>
                    </div>
                    <div>
                      <p className='text-sm'>{t('home.description')}: <span className='font-medium'>{item.Description}</span></p>
                      <p className='text-sm'>{t('home.category')}: <span className='font-medium'>{item.Category}</span></p>
                      <p className='text-sm'>{t('home.model')}: <span className='font-medium'>{item.model}</span></p>
                      <p className='text-sm'>{t("home.tagId")}: <span className='font-medium'>{item.tagId}</span></p>
                      <p className='text-sm'>{t('home.company')}: <span className='font-medium'>{item.company}</span></p>
                      <p className='text-sm'>{t('home.subLocation')}: <span className='font-medium'>{item.subLocation}</span></p>
                      <p className='text-sm'>{t('home.reserved')}: <span className='font-medium'>{item.reserved}</span></p>
                    </div>
                    <div id='buttons' className='flex gap-2'>
                      <div>
                        {authState.isAuthenticated && (
                          <>
                            <button
                              className='w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center'
                              onClick={() => deleteItems(item.Id)}
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
                           <button className=' w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center' onClick={() => openEditModal(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>                            
                          </button>
                      </div>  
                      </>
                      :
                      <>
                      <div>
                           <button disabled={item.isEditable === false}  className={`${item.isEditable === false ? 'bg-gray-300 text-gray-500 w-10 h-10 rounded-full items-center flex justify-center' : ' w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center'}`} onClick={() => openEditModal(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>                            
                          </button>
                      </div> 
                      </>                    
                    }     

                      <div>
                        <NavLink className='w-10 h-10 bg-blue-600 text-white rounded-full items-center flex justify-center' to={`${item.Id}`}>
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
        <EditItemModal item={selectedItem} onClose={closeEditModal} setItems={setItems} />
      )}
    </>
  );
};

export default Items;
