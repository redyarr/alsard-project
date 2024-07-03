import React from 'react'

const User = (props) => {


    function DeleteButton(){
        props.delete(props.idd);
     }


  return (
<>
<div className='w-[300px] h-[250px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
    <div className='flex gap-2'>
        <h1 className='font-bold'>{props.id}</h1>
        <h1 className='font-bold'>{props.name}</h1>
    </div>

    <div>
        <p className='font-medium'>{props.email}</p>
        <p className='font-medium'>{props.phone}</p>
        <p className='font-medium'>{props.address}</p>
        <p className='font-medium'>{props.position}</p>
    </div>

    <button className='w-[100px] h-[30px] bg-indigo-500  text-white rounded' onClick={DeleteButton}>delete</button>
</div>
</>
  )
}

export default User
