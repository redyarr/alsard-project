import { useState } from "react";



 function AddEmployees() {
  const [data, setData] = useState({
    name:"",
    email:"",
    department:"",
    phone:"",
    UserID:"",
    position:""
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
  if (responseData.status == 'ok') {
    console.log('Data added successfully');
  } else {
    console.log(responseData.error);
  }

  setData({
    name:"",
    email:"",
    department:"",
    phone:"",
    UserID:"",
    position:""
  })
}




function handlechange(event){
    const{name, value}=event.target;
    setData(prevnote=>{
      return{
        ...prevnote, 
        [name]:value
      }
    })
  }

  // function handlesubmit(event){
  //   props.onAdd(data);
    
  //     setData({
  //       name:"",
  //       email:"",
  //       department:"",
  //       phone:"",
  //       UserID:"",
  //       position:""
  //     })
  //     event.preventDefault();
  //   }


  return (
<>

    <form onSubmit={fetching} className="mt-5 text-black mx-auto max-w-8xl   xl:px-6 2xl:px-20 flex  flex-col">
      <div className="space-y-12">


        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

          <div className="mt-10 flex flex-col">

           <div className="flex flex-row gap-10">
            <div className="sm:col-span-3">
              <label  htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                name
              </label>
              <div className="mt-2">
                <input
                required
                value={data.name}
                onChange={handlechange}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label  htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                required
                value={data.email}
                onChange={handlechange}
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label  htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                Department
              </label>
              <div className="mt-2">
                <input
                required
                value={data.department}
                onChange={handlechange}
                  id="department"
                  name="department"
                  type="text"
                  autoComplete="department"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
        </div> 
          <div className="flex flex-row gap-5">
            <div className="sm:col-span-4">
              <label  htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                required
                value={data.phone}
                onChange={handlechange}
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="col-span-full">
              <label  htmlFor="UserID" className="block text-sm font-medium leading-6 text-gray-900">
                Employee ID
              </label>
              <div className="mt-2">
                <input
                required
                value={data.UserID}
                onChange={handlechange}
                  type="text"
                  name="UserID"
                  id="UserID"
                  autoComplete="UserID"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label  htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">
                Position
              </label>
              <div className="mt-2">
                <input
                required
                value={data.position}
                onChange={handlechange}
                  type="text"
                  name="position"
                  id="position"
                  autoComplete="address-level2"
                  className="block w-[300px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
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
          Save
        </button>
      </div>
    </form>




    </>
  )
}


export default AddEmployees;