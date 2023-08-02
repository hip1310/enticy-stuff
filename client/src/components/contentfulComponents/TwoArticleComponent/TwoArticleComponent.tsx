import { getImageUrl } from "../../util/commonFunctions";

const TwoArticleComponent = (element: any) => {
  const { references, title } = element;

  return (
    <>
      <h1 className="margin-20-px">{title}</h1>
      <div className="twoArticleContainer">
        {references?.map((referencesElement: any, index: number) => {
          return (
            <SingleArticleComponent
              key={index}
              {...referencesElement?.fields}
              lastItem={references?.length - 1 === index}
            />
          );
        })}
      </div>
    </>
  );
};

const SingleArticleComponent = (element: any) => {
  const { title, image, lastItem } = element;
  return (
    <div
      className={`singleArticleImageContainer  ${
        lastItem ? " float-right" : " float-left"
      }`}
    >
      <img
        src={getImageUrl(image)}
        alt="image1"
        className="singleArticleImage"
      />
      <h3 className="singleArticleText">{title}</h3>
    </div>
  );
};

export default TwoArticleComponent;
