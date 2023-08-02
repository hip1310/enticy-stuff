import HeroComponent from "./contentfulComponents/HeroComponent";
import ProductContainer from "./contentfulComponents/ProductComponent/ProductContainer";
import TwoArticleComponent from "./contentfulComponents/TwoArticleComponent/TwoArticleComponent";

const MainContainer = (props: any) => {
  const { references, products } = props;
  if (references?.length === 0 || products?.length === 0) {
    return <>No page found</>;
  }

  let isProduct = false;
  if (products?.length > 0) {
    isProduct = true;
  }
  return (
    <>
      {references?.map((element: any, index: number) => {
        return <ColumnedSection key={index} {...element} />;
      })}
      {isProduct && <ProductContainer products={products} />}
    </>
  );
};

const ColumnedSection = (element: any) => {
  const { fields } = element;
  const isHero = !(fields?.references?.length > 0);
  const isTwoArticle = fields?.references?.length > 0;
  if (isHero) {
    return <HeroComponent {...fields} />;
  } else if (isTwoArticle) {
    return <TwoArticleComponent {...fields} />;
  } else {
    return <>No page found</>;
  }
};

export default MainContainer;
