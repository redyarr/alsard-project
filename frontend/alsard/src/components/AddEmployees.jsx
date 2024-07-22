import { useState } from "react";
import { useTranslation } from 'react-i18next';

function AddEmployees() {
  const { t } = useTranslation();
  const [data, setData] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    UserID: "",
    position: ""
  });

  async function fetching(event) {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/addEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        department: data.department,
        phone: data.phone,
        UserID: data.UserID,
        position: data.position
      }),
    });

    const responseData = await res.json();
    console.log(responseData);
    if (responseData.status === 'ok') {
      console.log('Data added successfully');
    } else {
      console.log(responseData.error);
    }

    setData({
      name: "",
      email: "",
      department: "",
      phone: "",
      UserID: "",
      position: ""
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  return (
    <>
      <form onSubmit={fetching} className="mt-5 text-black mx-auto max-w-8xl xl:px-6 2xl:px-20 flex flex-col">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">{t('home.personalInformation')}</h2>

            <div className="mt-10 flex flex-col">
              <div className="flex flex-row gap-10">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    {t('home.name')}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={data.name}
                      onChange={handleChange}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    {t('home.email')}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={data.email}
                      onChange={handleChange}
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                    {t('home.department')}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={data.department}
                      onChange={handleChange}
                      id="department"
                      name="department"
                      type="text"
                      autoComplete="department"
                      className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-5">
                <div className="sm:col-span-4">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    {t('home.phone')}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={data.phone}
                      onChange={handleChange}
                      id="phone"
                      name="phone"
                      type="phone"
                      autoComplete="phone"
                      className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="UserID" className="block text-sm font-medium leading-6 text-gray-900">
                    {t('home.employeeId')}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={data.UserID}
                      onChange={handleChange}
                      type="text"
                      name="UserID"
                      id="UserID"
                      autoComplete="UserID"
                      className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">
                    {t('home.position')}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={data.position}
                      onChange={handleChange}
                      type="text"
                      name="position"
                      id="position"
                      autoComplete="address-level2"
                      className="block w-[300px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {t('home.save')}
          </button>
        </div>
      </form>
    </>
  );
}

export default AddEmployees;
