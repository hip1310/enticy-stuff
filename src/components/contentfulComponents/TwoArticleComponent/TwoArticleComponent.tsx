const TwoArticleComponent = (element: any) => {
  const { references } = element;

  return (
    <>
      <h1 className="margin-20-px">{element.title}</h1>
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
  const image = element?.image?.fields?.file?.url;
  return (
    <div
      className={`singleArticleImageContainer  ${
        element?.lastItem ? " float-right" : " float-left"
      }`}
    >
      <img src={image} alt="image1" className="singleArticleImage" />
      <h3 className="singleArticleText">{element?.title}</h3>
    </div>
  );
};

export default TwoArticleComponent;
