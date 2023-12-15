import React, { lazy } from "react";
import { PRODUCT_PAGE_LIMIT, SLUGS } from "../util/constant";

// Lazy load the ContentfulMainComponent for better performance
const ContentfulMainComponent = lazy(() =>
  import("./contentfulComponents/ContentfulMainComponent")
);

type propsType = {
  filter: Object;
  onChangeFilter: (key: string, value: string) => void;
};

const ProductContainer = (props: propsType) => {
  return (
    <ContentfulMainComponent
      slug={SLUGS.PRODUCT}
      limit={PRODUCT_PAGE_LIMIT}
      filter={props.filter}
      onChangeFilter={props.onChangeFilter}
      fetchItems={true} // Ensure fetchItems is a boolean value
    />
  );
};

export default ProductContainer;
