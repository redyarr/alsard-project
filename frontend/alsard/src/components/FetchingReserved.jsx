import RecervedItems from "./ReservedItems";
const FetchingItems = ({ items, deleteItems }) => {
  return (
    <div >
      {items.map((item) => (
        <section key={item.Id} className='inline-block mr-5 mb-5'>
          <RecervedItems
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
  );
};

export default FetchingItems;
