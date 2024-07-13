import RecervedItems from "./ReservedItems";
const FetchingItems = ({ reserved }) => {
  return (
<div >
{reserved.length === 0 ? <p className='p-5 text-2xl text-red-600 font-bold'>No Employee Found</p> : 

<div>
     {reserved.map((res) => (
        <section key={res.id} className='inline-block mr-5 mb-5'>
          <RecervedItems
            key={res.id}
            id={res.id}
            name={res.employee.name}
            email={res.employee.email}
            phone={res.employee.phone}
            itemName={res.item.name}
            itemDescription={res.item.description}
            // delete={deleteItems}
          />
        </section>
      ))}
</div>
}


</div>
  );
};

export default FetchingItems;


