import { useState } from 'react';
import CreateUser from './components/CreateUser';
import User from './components/User';


export default function App() {
  const [userData, setUserData]=useState([])
  console.log(userData);
  

  

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


<section className='flex  gap-3'>

{userData.map((userdata, index) =>{
       return (
       <User 
       key={index}
       id={userdata.id}
       name={userdata.title} 
       email={userdata.email} 
       phone={userdata.phone}
       address={userdata.address}
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