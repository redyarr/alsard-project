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

  if (isLoading) {
    return <div>{t('home.loading')}</div>; // Show loading message
  }

  return (
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
    </>
  );
};

export default ReservedDetail;
