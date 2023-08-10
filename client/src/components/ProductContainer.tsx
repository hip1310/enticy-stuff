import React from "react";
import { SLUGS } from "./util/constant";

const ContentfulMainComponent = React.lazy(
  () => import("./contentfulComponents/ContentfulMainComponent")
);

const ProductContainer = () => {
  return <ContentfulMainComponent slug={SLUGS.productContainer} />;
};
export default ProductContainer;
