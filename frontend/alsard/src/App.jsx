import { useState } from 'react';
import CreateUser from './components/CreateUser';
import User from './components/User';


export default function App() {
  const [userData, setUserData]=useState([])
  

  

  function addData(note){
    setUserData(prev=>{
      return [note, ...prev]
    })
    }


    function deleteData(id){
      setUserData(prevValue=>{
        return prevValue.filter((noteItem, index)=>{
          return index!==id;
        })
      })
      }


  return (

<>
<section className='p-10'> <CreateUser onAdd={addData} /> </section>


<section className=' p-4 flex  gap-3'>

{userData.map((userdata, index) =>{
       return (
       <User 
       key={index}
       name={userdata.name} 
       email={userdata.email} 
       phone={userdata.phone}
       UserID={userdata.UserID}
       position={userdata.position}
       delete={deleteData}
       idd={index}

       />
       );
      })}
</section>


</>
  )
}