import { useState } from "react";



function AddItems() {
  const [data, setData] = useState({
    Name: "",
    Description: "",
    Category: "",
    model: "",
    tagId: "",
    company: "",
    subLocation: "",
    reserved: ""
  });


  async function fetching(event) {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/additems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: data.Name,
        Description: data.Description,
        Category: data.Category,
        model: data.model,
        tagId: data.tagId,
        company: data.company,
        subLocation: data.subLocation,
        reserved: data.reserved
      }),
    });

    const responseData = await res.json();
    console.log(responseData);
    if (responseData.status == 200) {
      console.log('Data added successfully');
    } else {
      console.log("couldnt create the item for some reason bro : " + responseData.error);
    }

    setData({
      Name: "",
      Description: "",
      Category: "",
      company: "",
      model: "",
      tagId: "",
      subLocation: ""
    })
  }




  function handlechange(event) {
    const { name, value } = event.target;
    setData(prevnote => {
      return {
        ...prevnote,
        [name]: value
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
                  <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
                    name
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={data.Name}
                      onChange={handlechange}
                      type="text"
                      name="Name"
                      id="Name"
                      autoComplete="given-name"
                      className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="Description" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={data.Description}
                      onChange={handlechange}
                      id="Description"
                      name="Description"
                      type="text"
                      autoComplete="Description"
                      className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="Category" className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={data.Category}
                      onChange={handlechange}
                      id="Category"
                      name="Category"
                      type="text"
                      autoComplete="Category"
                      className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
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
              </div>
              <div className="flex flex-row gap-5">
                <div className="col-span-full">
                  <label htmlFor="tagId" className="block text-sm font-medium leading-6 text-gray-900">
                    Tag ID
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={data.tagId}
                      onChange={handlechange}
                      type="text"
                      name="tagId"
                      id="tagId"
                      autoComplete="tagId"
                      className="p-2 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
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
                  <label htmlFor="subLocation" className="block text-sm font-medium leading-6 text-gray-900">
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
                      autoComplete="a subLocation"
                      className="block w-[300px] p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="reserved" className="block text-sm font-medium leading-6 text-gray-900">
                  Reserved
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={data.reserved}
                      onChange={handlechange}
                      type="text"
                      name="reserved"
                      id="reserved"
                      autoComplete="no"
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