import HeroComponent from "./contentfulComponents/HeroComponent";
import TwoArticleComponent from "./contentfulComponents/TwoArticleComponent/TwoArticleComponent";

const MainContainer = (props: any) => {
  const { references } = props;
  if (!(references?.length > 0)) {
    return <>No page found</>;
  }
  return (
    <>
      {references?.map((element: any, index: number) => {
        return <ColumnedSection key={index} {...element} />;
      })}
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
