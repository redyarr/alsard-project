import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { FaPrint, FaArrowRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const[isLoading, setIsLoading] = useState(true);
  const {t} = useTranslation();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/employee/${id}/details`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee details:', error.message);
        setError('Error fetching employee details');
      }finally{
        setIsLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (error) {
    return <div>{error}</div>;
  }

 

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
    <div id='haha' className='flex gap-72 mt-5 pb-5 text-black mx-auto max-w-8xl xl:px-6 2xl:px-20'>
      
      <div className='left-0'>
        <NavLink className='w-10 h-10 bg-blue-600 rounded-full items-center flex justify-center' to={-1}>
          <FaArrowRight className='text-white rotate-180' />
        </NavLink>
      </div>

      <div className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full max-w-4xl h-fit'>
        <h1 className='text-2xl font-bold mb-4'>{employee.Name}</h1>
        <p className='font-medium mb-2'>{t("home.email")}: {employee.Email}</p>
        <p className='font-medium mb-2'>{t("home.department")}: {employee.department}</p>
        <p className='font-medium mb-2'>{t("home.phone")}: {employee.Phone}</p>
        <p className='font-medium mb-2'>{t("home.employeeId")}: {employee.employeeId}</p>
        <p className='font-medium mb-2'>{t("home.position")}: {employee.Position}</p>

        <h2 className='text-xl font-bold mt-6 mb-2'>{t("navbar.reservedItems")}</h2>
        {employee.reservedItems.length === 0 ? (
          <p className='font-medium text-red-600'>{t("home.noReservedItem")}</p>
        ) : (
          <table className='min-w-full divide-y divide-gray-200 border-2 border-black'>
            <thead>
              <tr>
                <th className='px-6 py-3 text-xs font-medium text-gray-700 text-center border-2 border-black uppercase tracking-wider'>{t("home.name")}</th>
                <th className='px-6 py-3 text-xs font-medium text-gray-700 text-center border-2 border-black uppercase tracking-wider'>{t("home.category")}</th>
                <th className='px-6 py-3 text-xs font-medium text-gray-700 text-center border-2 border-black uppercase tracking-wider'>{t("home.model")}</th>
                <th className='px-6 py-3 text-xs font-medium text-gray-700 text-center border-2 border-black uppercase tracking-wider'>{t("home.tagId")}</th>
                <th className='px-6 py-3 text-xs font-medium text-gray-700 text-center border-2 border-black uppercase tracking-wider'>{t("home.company")}</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {employee.reservedItems.map(item => (
                <tr key={item.Id}>
                  <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.Name}</td>
                  <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.Category}</td>
                  <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.model}</td>
                  <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.tagId}</td>
                  <td className='px-6 py-4 whitespace-nowrap border-2 border-black text-center font-medium'>{item.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className='mt-6'>
          <button onClick={handlePrint} className='w-[100px] h-[40px] bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium gap-5 p-2 flex items-center'> 
            {t("home.print")} <FaPrint />
          </button>
        </div>
      </div>
    </div>
  </>

}
  </>);

};

export default EmployeeDetail;
