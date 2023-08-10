import "./Footer.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
const FooterContainer = (element: any) => {
  const { description } = element;
  return (
    <div className="footerContainer">
      {documentToReactComponents(description)}
    </div>
  );
};
export default FooterContainer;
