import { useEffect, useState } from 'react';
import { useParams,NavLink } from 'react-router-dom';
import { FaPrint, FaArrowRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const ReservedDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/reservedItems/${id}/detail`);
        if (!response.ok) {
          throw new Error('Failed to fetch reserved item details');
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching reserved item details:', error.message);
      }finally{
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };


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
    <div id='haha' className=' flex gap-72 mt-5 pb-5 text-black mx-auto max-w-8xl xl:px-6 2xl:px-20'>
      <div className='left-0'>
        <NavLink className='w-10 h-10 bg-blue-600 rounded-full items-center flex justify-center' to='/reserved'>
          <FaArrowRight className='text-white rotate-180' />
        </NavLink>
      </div>

      <div className='w-full max-w-4xl bg-gray-200 p-6 rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>{details.reservedItem.item.name}</h1>
        <p className='text-[16px] mb-2'>{t('home.description')}: <span className='font-medium'>{details.reservedItem.item.description}</span></p>
        <p className='text-[16px] mb-2'>{t('home.category')}: <span className='font-medium'>{details.reservedItem.item.category}</span></p>
        <p className='text-[16px] mb-2'>{t('home.model')}: <span className='font-medium'>{details.reservedItem.item.model}</span></p>
        <p className='text-[16px] mb-2'>{t('home.tagId')}: <span className='font-medium'>{details.reservedItem.item.tagId}</span></p>
        <p className='text-[16px] mb-2'>{t('home.company')}: <span className='font-medium'>{details.reservedItem.item.company}</span></p>
        <p className='text-[16px] mb-2'>{t('home.subLocation')}: <span className='font-medium'>{details.reservedItem.item.subLocation}</span></p>
        <p className='text-[16px] mb-2'>{t('home.reserved')}: <span className='font-medium'>{details.reservedItem.item.reserved}</span></p>

        <br />
        <p className='mb-2'>{t('home.reservedBy')}:</p>
        <h1 className='text-xl font-bold mb-4'>{details.reservedItem.employee.name}</h1>
        <p className='text-[16px] mb-2'>{t('home.email')}: <span className='font-medium'>{details.reservedItem.employee.email}</span></p>
        <p className='text-[16px] mb-2'>{t('home.phone')}: <span className='font-medium'>{details.reservedItem.employee.phone}</span></p>
        <p className='text-[16px] mb-2'>{t('home.department')}: <span className='font-medium'>{details.reservedItem.employee.department}</span></p>
        <p className='text-[16px] mb-2'>{t('home.position')}: <span className='font-medium'>{details.reservedItem.employee.position}</span></p>
        <p className='text-[16px] mb-2'>{t('home.employeeId')}: <span className='font-medium'>{details.reservedItem.employee.employeeId}</span></p>
        
<br />
        <p>Other Items Reserved by <span className='font-bold'> {details.reservedItem.employee.name} </span> </p>
        <br />
          <table className='min-w-full divide-y divide-gray-200 border-2 border-black'>
            <thead>
              <tr className='text-center border-2 border-black'>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>{t('home.name')}</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>{t('home.description')}</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>{t('home.category')}</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>{t('home.model')}</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>{t('home.tagId')}</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>{t('home.company')}</th>
                <th className='px-6 py-3 text-center border-2 border-black text-xs font-medium text-gray-700 uppercase tracking-wider'>{t('home.subLocation')} </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
            {details.otherReservedItems.map((item) => (
              <tr key={item.id}>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.name}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.description}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.category}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.model}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.tagId}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.company}</td>
                <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.item.subLocation}</td>
              </tr>
            ))}
            </tbody>
          </table>
  

        <div className='mt-6'>
          <button onClick={handlePrint} className='w-[100px] h-[40px] bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium gap-5 p-2 flex items-center'> 
            Print <FaPrint />
          </button>
        </div>
      </div>
    </div>
</>}
    </>
  );
};

export default ReservedDetail;
