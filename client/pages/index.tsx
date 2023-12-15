"use client";
import ProductContainer from "../components/ProductContainer";
import React, { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const [filterObject, setFilterObject] = useState<any>({});

  const onChangeFilter = (key: string, value: string) => {
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
      const fieldCategorykey = "fields.category[in]"
      if (value?.split(":")[0] === "delete") {
        filterObject[fieldCategorykey] = filterObject[fieldCategorykey].replace("," + value?.split(":")[1], "").replace(value?.split(":")[1], "");
        if (filterObject[fieldCategorykey] === "") {
          delete filterObject[fieldCategorykey];
        }
        setFilterObject({ ...filterObject });
      } else {
        if (filterObject[fieldCategorykey]) {
          setFilterObject({ ...filterObject, [fieldCategorykey]: filterObject[fieldCategorykey] + "," + value });
        } else {
          setFilterObject({ ...filterObject, [fieldCategorykey]: value });
        }
      }
    }
  };
  return (
    <>
      <ProductContainer filter={filterObject} onChangeFilter={onChangeFilter} />
    </>
  );
}
