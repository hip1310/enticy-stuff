import "./Filter.css";
import { useState } from "react";

const FilterContainer = (element: any) => {
  const { categories, price, onChangeFilter, filter } = element;
  const [categoryCollapsible, setCategoryCollapsible] = useState<boolean>(true);
  const [priceCollapsible, setPriceCollapsible] = useState<boolean>(true);

  return (
    <div className=" filtermain">
      {categories ? (
        <>
        <div className="categories">
            <h5 className="margin-left-5-px position-fixed filterText">
              <b>Filters </b>
            </h5>
          <h6
            className="margin-top-40-px display-flex margin-left-5-px margin-bottom-0 cursor-pointer position-fixed"
            onClick={() => {
              setCategoryCollapsible(!categoryCollapsible);
            }}
          >
            Categories
          </h6>
          <p
            className="collapsible categoryCollapsible"
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
                        checked={filter["fields.category"] === categoryElement || false}
                        onChange={(element) => {
                          if (!element.target.checked) {
                            onChangeFilter("category","")
                          } else {
                            onChangeFilter("category",categoryElement)
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
        <div className="prices">
          <h6
            className="margin-top-10-px display-flex margin-left-5-px margin-bottom-0 cursor-pointer position-fixed"
            onClick={() => {
              setPriceCollapsible(!priceCollapsible);
            }}
          >
            Price
          </h6>
          <p
            className="collapsible priceCollapsible"
            onClick={() => {
              setPriceCollapsible(!priceCollapsible);
            }}
          >
            {priceCollapsible ? "—" : "+"}
          </p>
          {priceCollapsible && (
            <div className="filterContainer">
              <div className="filterCategories">
                {price?.map((element: any, index: number) => {
                  return (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={element}
                        name={element}
                        value={element}
                        checked={filter["fields.price[gte]"] === element.split("-")[0] || false}
                        onChange={(onChangeElement) => {
                          if (!onChangeElement.target.checked) {
                            onChangeFilter("price","")
                          } else {
                            onChangeFilter("price",element)
                          }
                        }}
                      />
                      <label
                        className="filterCheckboxLabel"
                        htmlFor={element}
                      >
                        {element}
                      </label>
                      <br></br>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default FilterContainer;
