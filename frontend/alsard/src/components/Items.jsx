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



  return (
    <>
    {isLoading ?
    <>
      <div className='flex items-center justify-center'>
          <div class="flex items-center justify-center w-[5rem] text-center">
              <div role="status">
                  <svg aria-hidden="true" className="w-full mb-5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                  <span class="text-lg font-bold">{t('home.loading')}</span>
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
                  <div className='w-[330px] h-[295px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
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
    </>}
    </>
  );
};

export default Items;
