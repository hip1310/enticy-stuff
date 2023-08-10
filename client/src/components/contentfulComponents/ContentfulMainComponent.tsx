import { fetchFields } from "../../services/contentfulService";
import { useState, useEffect } from "react";
import ContentfulMainContainerComponent from "./ContentfulMainContainerComponent";
import { SLUGS } from "../util/constant";
const ContentfulMainComponent = (props: any) => {
  const { slug } = props;
  const [contentfulData, setContentfulData] = useState<any>([]);

  useEffect(() => {
    const getDataFromContentful = async () => {
      const fechedFields = await fetchFields({
        contentType: slug || SLUGS.productContainer,
      });
      setContentfulData(fechedFields);
    };
    getDataFromContentful();
  }, [slug]);

  return (
    <div className="main-conainer">
      {contentfulData &&
        contentfulData?.map((element: any, index: number) => {
          return (
            <ContentfulMainContainerComponent
              key={index}
              {...element}
              slug={slug}
            />
          );
        })}
    </div>
  );
};
export default ContentfulMainComponent;
