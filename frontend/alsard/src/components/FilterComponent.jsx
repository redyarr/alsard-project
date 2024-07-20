

const FilterComponent = ({ filters, handleFilterChange }) => {
  return (
    <div className="flex gap-10 justify-center items-center">
      {filters.map((filter, index) => (
        <div className="flex flex-row-reverse gap-2 items-center justify-center" key={filter.name}>
            <label htmlFor={filter.label}> {filter.label} </label>
              <input
                className="custom-checkbox w-5 h-5 appearance-none cursor-pointer border border-gray-300  rounded-md mr-2 hover:border-blue-600 hover:bg-blue-100 checked:bg-no-repeat checked:bg-center checked:border-blue-600 checked:bg-blue-200" 
                type="checkbox"
                checked={filter.checked}
                id={filter.label}
                onChange={() => handleFilterChange(index)}
              />
        </div>
      ))}
    </div>
  );
};

export default FilterComponent;
