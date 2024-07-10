


const ReservedItems = (props) => {

return (
<>
<div className='mt-5 text-black mx-auto max-w-8xl   xl:px-6 2xl:px-20 flex'>

<div className='w-[300px] h-[270px] flex flex-col gap-3 p-3 bg-gray-200 rounded-lg'>
    <div className='flex gap-2'>
        <h1 className='text-xl font-bold'>{props.name}</h1>
    </div>

    <div>
        <p className='font-medium'>{props.description}</p>
        <p className='font-medium'>{props.category}</p>
        <p className='font-medium'>{props.model}</p>
        <p className='font-medium'>{props.tagID}</p>
        <p className='font-medium'>{props.company}</p>
        <p className='font-medium'>{props.subLocation}</p>
        <p className='font-medium'>{props.reserved}</p>
    </div>
</div>
</div>
</>
  )
}

export default ReservedItems
