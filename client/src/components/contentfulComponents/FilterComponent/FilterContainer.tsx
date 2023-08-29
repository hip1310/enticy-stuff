import { useParams } from "react-router-dom";
import "./Filter.css";
import { useState } from "react";

const FilterContainer = (element: any) => {
  const { categories } = element;
  const { category } = useParams();
  const [categoryCollapsible, setCategoryCollapsible] = useState<boolean>(true);

  return (
    <div className=" filtermain">
      {categories ? (
        <div className="categories">
          <div>
            <h5 className="margin-left-5-px position-fixed">
              <b>Filters </b>
            </h5>
          </div>
          <h6
            className="margin-top-40-px display-flex margin-left-5-px margin-bottom-0 cursor-pointer position-fixed"
            onClick={() => {
              setCategoryCollapsible(!categoryCollapsible);
            }}
          >
            Categories
          </h6>
          <p
            className="categoryCollapsible"
            onClick={() => {
              setCategoryCollapsible(!categoryCollapsible);
            }}
          >
            {categoryCollapsible ? "—" : "+"}
          </p>
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
                            window.location.href =
                              "/products/" + categoryElement;
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
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default FilterContainer;
