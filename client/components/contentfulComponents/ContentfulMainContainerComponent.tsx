import { Document } from '@contentful/rich-text-types';
import { isEmptyArray, noPageFound } from "../../util/commonFunctions";
import { SLUGS } from "../../util/constant";
import ProductContainer from "./ProductComponent/ProductContainer";
import HeaderContainer from "./HeaderComponent/HeaderContainer";
import FooterContainer from "./FooterComponent/FooterContainer";
import FilterContainer from "./FilterComponent/FilterContainer";


type propsType = {
  logo?: string;
  slug: string;
  productNames?: string[];
  products?:Object;
  total?:number;
  filter?: Object;
  setSkip: (value: number | ((prevVar: number) => number)) => void
  onChangeFilter: (key: string, value: string) => void;
  description: Document
};

const ContentfulMainContainerComponent = (props: propsType) => {
  const { slug } = props;

  // Determine the type of content based on the provided slug
  const isProduct = slug === SLUGS.PRODUCT;
  const isHeader = slug === SLUGS.HEADER;
  const isFooter = slug === SLUGS.FOOTER;
  const isFilter = slug === SLUGS.FILTER;

  if (isProduct) {
    if (isEmptyArray(props.products)) {
      // Display a "No Page Found" message if the products array is empty
      return noPageFound();
    } else {
      // Render the ProductContainer component with relevant props
      return (
        <ProductContainer
          products={props.products}
          setSkip={props.setSkip}
          total={props.total}
          onChangeFilter={props.onChangeFilter}
          filter={props.filter}
        />
      );
    }
  } else if (isHeader) {
    if (isEmptyArray(props.productNames)) {
      // Display a "No Page Found" message if the productNames array is empty
      return noPageFound();
    } else {
      // Render the HeaderContainer component with relevant props
      return (
        <HeaderContainer logo={props.logo} productNames={props.productNames} />
      );
    }
  } else if (isFooter) {
    // Render the FooterContainer component with relevant props
    return <FooterContainer {...props} />;
  } else if (isFilter) {
    // Render the FilterContainer component with relevant props
    return <FilterContainer {...props} />;
  } else {
    // Default case, render nothing
    return <></>;
  }
};

export default ContentfulMainContainerComponent;
