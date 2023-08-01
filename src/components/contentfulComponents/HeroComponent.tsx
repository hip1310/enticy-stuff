import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
const HeroComponent = (element: any) => {
  const image = element?.image?.fields?.file?.url;
  return (
    <div className="heroContainer">
      <div className="heroText">
        <h1>{element?.title}</h1>
        {documentToReactComponents(element.description)}
      </div>
      <div className="heroImageContainer">
        <img src={image} alt="image1" className="heroImage" />
      </div>
    </div>
  );
};
export default HeroComponent;
