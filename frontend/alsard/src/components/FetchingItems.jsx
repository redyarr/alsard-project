import Items from './Items';

const FetchingItems = ({ items, deleteItems }) => {
  return (
    <div >
    {items.length === 0 ? <p className='p-5 text-2xl text-red-600 font-bold'>No Item Found</p> : 
    
   <div>
   {items.map((item) => (
     <section key={item.Id} className='inline-block mr-5 mb-5'>
          <Items
            key={item.Id}
            id={item.Id}
            name={item.Name}
            description={item.Description}
            category={item.Category}
            model={item.model}
            tagID={item.tagId}
            company={item.company}
            subLocation={item.subLocation}
            reserved={item.reserved}
            delete={deleteItems}
          />
     </section>
   ))}
   </div>
   }

    
   </div>
  );
};

export default FetchingItems;
