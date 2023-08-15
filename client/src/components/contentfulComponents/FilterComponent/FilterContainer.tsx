import { useParams } from "react-router-dom";
import "./Filter.css";
import { useState } from "react";

const FilterContainer = (element: any) => {
  const { categories } = element;
  const { category } = useParams();
  const [categoryCollapsible, setCategoryCollapsible] = useState<boolean>(true);

  return categories ? (
    <>
      <h5 className="margin-left-5-px">
        <b>Filters </b>
      </h5>
      <h6
        className="margin-top-15-px display-flex margin-left-5-px margin-bottom-0 cursor-pointer"
        onClick={() => {
          setCategoryCollapsible(!categoryCollapsible);
        }}
      >
        Categories
        <p className="categoryCollapsible">{categoryCollapsible ? "-" : "+"}</p>
      </h6>
      {categoryCollapsible && (
        <div className="filterContainer">
          <div className="filterCategories">
            {categories?.map((categoryElement: any, index: number) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={categoryElement}
                    name={categoryElement}
                    value={categoryElement}
                    checked={category === categoryElement || false}
                    onChange={(element) => {
                      if (!element.target.checked) {
                        window.location.href = "/";
                      } else {
                        window.location.href = "/products/" + categoryElement;
                      }
                    }}
                  />
                  <label
                    className="filterCheckboxLabel"
                    htmlFor={categoryElement}
                  >
                    {categoryElement}
                  </label>
                  <br></br>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  ) : (
    <></>
  );
};
export default FilterContainer;
