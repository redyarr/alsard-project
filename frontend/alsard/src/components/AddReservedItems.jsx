import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
function AddReservedItems() {
  const [employees, setEmployees] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        console.log('Fetched employees:', data);
        setEmployees(data.employees);
      } catch (error) {
        console.error('Error fetching employees:', error.message);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/unreservedItems');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        console.log('Fetched items:', data);
        setItems(data.items);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };

    fetchEmployees();
    fetchItems();
  }, []);

  async function handleReserve() {
    try {
      const res = await fetch("http://localhost:3000/ReserveItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: selectedEmployeeId,
          itemId: selectedItemId
        }),
      });

      const responseData = await res.json();
      console.log(responseData);
      if (res.status === 201) {
        console.log('Item reserved successfully');
      } else {
        console.log("Couldn't reserve the item: " + responseData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setSelectedEmployeeId("");
    setSelectedItemId("");
  }

  return (
    <form onSubmit={handleReserve} className="mt-5 text-black mx-auto max-w-8xl xl:px-6 2xl:px-20 flex flex-col">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">{t("home.reserveAnItem")}</h2>

          <div className="mt-10 flex flex-col">
            <div className="sm:col-span-4">
              <label htmlFor="employee" className="block text-sm font-medium leading-6 text-gray-900">
                {t("navbar.employees")}
              </label>
              <div className="mt-2">
                <select
                  required
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  name="employee"
                  id="employee"
                  className="block w-[300px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                >
                  <option className="text-gray-500" value="" disabled>{t('home.selectEmployee')}</option>
                  {employees.map(employee => (
                    <option key={employee.Id} value={employee.Id}>{employee.Name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="item" className="block text-sm font-medium leading-6 text-gray-900">
                {t("navbar.items")}
              </label>
              <div className="mt-2">
                <select
                  required
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  name="item"
                  id="item"
                  className="block w-[300px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                >
                  <option className="text-gray-500" value="" disabled>{t('home.selectItem')}</option>
                  {items.map(item => (
                    <option key={item.Id} value={item.Id}> {`${item.Name} - ${item.tagId} - ${item.model}`}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {t('home.ReserveButton')}
        </button>
      </div>
    </form>
  );
}

export default AddReservedItems;
