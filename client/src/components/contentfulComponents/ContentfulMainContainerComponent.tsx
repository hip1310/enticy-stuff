import { isEmptyArray, noPageFound } from "../util/commonFunctions";
import { SLUGS } from "../util/constant";
import ProductContainer from "./ProductComponent/ProductContainer";
import HeaderContainer from "./HeaderComponent/HeaderContainer";
import FooterContainer from "./FooterComponent/FooterContainer";
import FilterContainer from "./FilterComponent/FilterContainer";

const ContentfulMainContainerComponent = (props: any) => {
  const { slug } = props;

  let isProduct = slug === SLUGS.PRODUCT;
  let isHeader = slug === SLUGS.HEADER;
  let isFooter = slug === SLUGS.FOOTER;
  let isFilter = slug === SLUGS.FILTER;

  if (isProduct) {
    if (isEmptyArray(props.products)) {
      return noPageFound();
    } else {
      return (
        <ProductContainer products={props.products} setSkip={props.setSkip} total={props.total} />
      );
    }
  } else if (isHeader) {
    if (isEmptyArray(props.productNames)) {
      return noPageFound();
    } else {
      return (
        <HeaderContainer logo={props.logo} productNames={props.productNames} />
      );
    }
  } else if (isFooter) {
    return <FooterContainer {...props} />;
  } else if (isFilter) {
    return <FilterContainer {...props} />;
  } else {
    return <></>;
  }
};

export default ContentfulMainContainerComponent;
