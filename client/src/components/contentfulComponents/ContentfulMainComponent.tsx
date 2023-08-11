import { fetchFields } from "../../services/contentfulService";
import { useState, useEffect } from "react";
import ContentfulMainContainerComponent from "./ContentfulMainContainerComponent";
import { SLUGS } from "../util/constant";
const ContentfulMainComponent = (props: any) => {
  const { slug, limit, fetchItems } = props;
  const [contentfulData, setContentfulData] = useState<any>([]);
  const [skip, setSkip] = useState<number>(0);

  useEffect(() => {
    const getDataFromContentful = async () => {
      const fechedFields = await fetchFields({
        contentType: slug || SLUGS.PRODUCT_CONTAINER,
        skip: skip,
        limit: limit,
        fetchItems: fetchItems,
      });
      if (slug === SLUGS.PRODUCT_CONTAINER) {
        setContentfulData([
          { products: fechedFields?.items, total: fechedFields?.total },
        ]);
      } else {
        setContentfulData(fechedFields);
      }
    };
    getDataFromContentful();
  }, [slug, skip]);

  return (
    <div className="main-conainer">
      {contentfulData &&
        contentfulData?.map((element: any, index: number) => {
          return (
            <ContentfulMainContainerComponent
              key={index}
              {...element}
              slug={slug}
              setSkip={setSkip}
            />
          );
        })}
    </div>
  );
};
export default ContentfulMainComponent;
