import React from "react";
import { PRODUCT_PAGE_LIMIT, SLUGS } from "./util/constant";

const ContentfulMainComponent = React.lazy(
  () => import("./contentfulComponents/ContentfulMainComponent")
);

const ProductContainer = () => {
  return <ContentfulMainComponent slug={SLUGS.PRODUCT} limit={PRODUCT_PAGE_LIMIT} fetchItems />;
};
export default ProductContainer;
