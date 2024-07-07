import React from 'react';
import Items from './Items';

const FetchingItems = ({ items, deleteItems }) => {
  return (
    <div >
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
            delete={deleteItems}
          />
        </section>
      ))}
    </div>
  );
};

export default FetchingItems;
