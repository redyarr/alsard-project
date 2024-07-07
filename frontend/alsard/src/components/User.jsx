import { useAuth } from './AuthContext';

const User = (props) => {
    const { authState } = useAuth();





    function DeleteButton(){
        props.delete(props.id);
     }


  return (
<>
<div className='mt-5 text-black mx-auto max-w-8xl   xl:px-6 2xl:px-20 flex'>

<div className='w-[300px] h-[250px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
    <div className='flex gap-2'>
        <h1 className='font-bold'>{props.name}</h1>
    </div>

    <div>
        <p className='font-medium'>{props.email}</p>
        <p className='font-medium'>{props.department}</p>
        <p className='font-medium'>{props.phone}</p>
        <p className='font-medium'>{props.UserID}</p>
        <p className='font-medium'>{props.position}</p>
    </div>
    {authState.isAuthenticated  && <button className='w-[100px] h-[30px] bg-blue-600  text-white rounded' onClick={DeleteButton}>delete</button> }
</div>
</div>
</>
  )
}

export default User
