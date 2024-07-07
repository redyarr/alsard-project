import { useAuth } from './AuthContext';

const Items = (props) => {
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
        <p className='font-medium'>{props.description}</p>
        <p className='font-medium'>{props.category}</p>
        <p className='font-medium'>{props.model}</p>
        <p className='font-medium'>{props.tagID}</p>
        <p className='font-medium'>{props.company}</p>
        <p className='font-medium'>{props.subLocation}</p>
    </div>
    {authState.isAuthenticated  && <button className='w-[100px] h-[30px] bg-blue-600  text-white rounded' onClick={DeleteButton}>delete</button> }
</div>
</div>
</>
  )
}

export default Items
