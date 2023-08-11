import './Filter.css'

const FilterContainer = (element: any) => {
  const { categories } = element;
  return categories ? (
    <div className='filterContainer'>
      Categories
      <br />
      <div className="filterCategories">
      {categories?.map((category: any, index: number) => {
        return (
          <div key={index}>
            <input
              type="checkbox"
              id={category}
              name={category}
              value={category}
            />
            <label className='filterCheckboxLabel' htmlFor={category}> {category}</label>
            <br></br>
          </div>
        );
      })}
      </div>
    </div>
  ) : (
    <></>
  );
};
export default FilterContainer;
