import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
const ProductContainer = React.lazy(() => import("./ProductContainer"));

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterObject, setFilterObject] = useState<any>({});

  const onChangeFilter = (key: string, value: any) => {
    if (key === "price") {
      if (value === "") {
        delete filterObject["fields.price[gte]"];
        delete filterObject["fields.price[lte]"];
        setFilterObject({ ...filterObject });
      } else {
        let splitPrice: any = value?.split("-");
        setFilterObject({
          ...filterObject,
          ["fields.price[gte]"]: splitPrice[0],
          ["fields.price[lte]"]: splitPrice[1],
        });
      }
    } else if (key === "category") {
      if (value === "") {
        delete filterObject["fields.category"];
      }
      setFilterObject({ ...filterObject, ["fields.category"]: value });
    }
  };
  return (
    <>
      {/* product container */}
      <ProductContainer filter={filterObject} onChangeFilter={onChangeFilter} />
    </>
  );
};

export default Home;
