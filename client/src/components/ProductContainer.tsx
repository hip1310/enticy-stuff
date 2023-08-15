import React from "react";
import { PRODUCT_PAGE_LIMIT, SLUGS } from "./util/constant";

const ContentfulMainComponent = React.lazy(
  () => import("./contentfulComponents/ContentfulMainComponent")
);

const ProductContainer = (props: any) => {
  return (
    <ContentfulMainComponent
      slug={SLUGS.PRODUCT}
      limit={PRODUCT_PAGE_LIMIT}
      category={props.category}
      fetchItems
    />
  );
};
export default ProductContainer;
