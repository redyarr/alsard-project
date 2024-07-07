import { useState } from "react";



 function AddItems() {
  const [data, setData] = useState({
    name:"",
    description:"",
    category:"",
    model:"",
    tagID:"",
    company:"",
    subLocation:""
});


async function fetching(event) {
  event.preventDefault();
  const res = await fetch("http://localhost:3000/additems", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      Description: data.description,
      Category: data.category,
      model: data.model,
      tagId: data.tagID,
      company: data.company,
      subLocation: data.subLocation
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
    description:"",
    category:"",
    company:"",
    model:"",
    tagID:"",
    subLocation:""
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
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

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
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label  htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <input
                required
                value={data.description}
                onChange={handlechange}
                  id="text"
                  name="description"
                  type="description"
                  autoComplete="description"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label  htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
              Category
              </label>
              <div className="mt-2">
                <input
                required
                value={data.category}
                onChange={handlechange}
                  id="category"
                  name="category"
                  type="text"
                  autoComplete="category"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
        </div> 
          <div className="flex flex-row gap-5">
            <div className="sm:col-span-4">
              <label  htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
              Model
              </label>
              <div className="mt-2">
                <input
                required
                value={data.model}
                onChange={handlechange}
                  id="model"
                  name="model"
                  type="text"
                  autoComplete="model"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="col-span-full">
              <label  htmlFor="UserID" className="block text-sm font-medium leading-6 text-gray-900">
                Tag ID
              </label>
              <div className="mt-2">
                <input
                required
                value={data.tagID}
                onChange={handlechange}
                  type="text"
                  name="UserID"
                  id="UserID"
                  autoComplete="UserID"
                  className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label  htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
              Company
              </label>
              <div className="mt-2">
                <input
                required
                value={data.company}
                onChange={handlechange}
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="a company"
                  className="block w-[300px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label  htmlFor="subLocation" className="block text-sm font-medium leading-6 text-gray-900">
              Sub-Location
              </label>
              <div className="mt-2">
                <input
                required
                value={data.subLocation}
                onChange={handlechange}
                  type="text"
                  name="subLocation"
                  id="subLocation"
                  autoComplete="a SubLocation"
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
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>




    </>
  )
}


export default AddItems;