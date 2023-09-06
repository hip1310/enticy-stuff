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
      filter={props.filter}
      onChangeFilter = {props.onChangeFilter}
      fetchItems
    />
  );
};
export default ProductContainer;
