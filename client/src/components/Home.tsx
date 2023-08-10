import React from "react";
const ProductContainer = React.lazy(() => import("./ProductContainer"));

const Home = () => {
  return (
    <>
      {/* product container */}
      <ProductContainer />
    </>
  );
};

export default Home;
