import React from "react";
import { useParams } from "react-router-dom";
const ProductContainer = React.lazy(() => import("./ProductContainer"));

const Home = () => {
  const { category } = useParams();
  let categoryObject = {
    "fields.category": category,
  };
  return (
    <>
      {/* product container */}
      <ProductContainer category={categoryObject} />
    </>
  );
};

export default Home;
