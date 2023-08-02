import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getImageUrl } from "../util/commonFunctions";
const HeroComponent = (element: any) => {
  const { description, image, title } = element;
  return (
    <div className="heroContainer">
      <div className="heroText">
        <h1>{title}</h1>
        {documentToReactComponents(description)}
      </div>
      <div className="heroImageContainer">
        <img src={getImageUrl(image)} alt="image1" className="heroImage" />
      </div>
    </div>
  );
};
export default HeroComponent;
