import { useState } from "react";



 function CreateUser(props) {
  const [data, setData] = useState({
    id:"",
    name:"",
    email:"",
    phone:"",
    address:"",
    position:""
});


  async function fetching(event){
    event.preventDefault();
    const response = await fetch("http://localhost:5000/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    props.onAdd(data);
    setData({
      id:"",
      name:"",
      email:"",
      phone:"",
      address:"",
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
  //       id:"",
  //       name:"",
  //       email:"",
  //       phone:"",
  //       address:"",
  //       position:""
  //     })
  //     event.preventDefault();
  //   }


  return (
<>

    <form onSubmit={fetching}>
      <div className="space-y-12">


        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 flex flex-col">

           <div className="flex flex-row gap-10">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                ID
              </label>
              <div className="mt-2">
                <input
                required
                value={data.id}
                onChange={handlechange}
                  type="number"
                  name="id"
                  id="id"
                  autoComplete="id"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
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
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                required
                value={data.email}
                onChange={handlechange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
        </div> 
          <div className="flex flex-row gap-5">
            <div className="sm:col-span-4">
              <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-900">
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
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                address
              </label>
              <div className="mt-2">
                <input
                required
                value={data.address}
                onChange={handlechange}
                  type="text"
                  name="address"
                  id="street-address"
                  autoComplete="street-address"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Position
              </label>
              <div className="mt-2">
                <input
                required
                value={data.position}
                onChange={handlechange}
                  type="text"
                  name="position"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-[300px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        // onClick={handlesubmit}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>




    </>
  )
}


export default CreateUser;