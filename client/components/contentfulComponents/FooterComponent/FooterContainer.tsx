import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from '@contentful/rich-text-types';

type propsType = {
  description: Document
};

const FooterContainer = (element: propsType) => {
  // Destructure the 'description' property from the 'element' object
  const { description } = element;

  return (
    <div className="text-white bg-black py-3.5 pl-5 bottom-0 fixed w-full">
      {documentToReactComponents(description)}
      {/* Render the description using the rich text renderer */}
    </div>
  );
};

export default FooterContainer;
