import { fetchFields } from "../../services/contentfulService";
import { useState, useEffect } from "react";
import ContentfulMainContainerComponent from "./ContentfulMainContainerComponent";
import { SLUGS } from "../util/constant";
const ContentfulMainComponent = (props: any) => {
  const { slug, limit, fetchItems, onChangeFilter } = props;
  const [contentfulData, setContentfulData] = useState<any>([]);
  const [skip, setSkip] = useState<number>(0);

  useEffect(() => {
    const getDataFromContentful = async () => {
      const fechedFields = await fetchFields({
        contentType: slug || SLUGS.PRODUCT,
        skip: skip,
        limit: limit,
        fetchItems: fetchItems,
        query: slug !== SLUGS.FILTER && props.filter,
      });
      if (slug === SLUGS.PRODUCT) {
        setContentfulData([
          { products: fechedFields?.items, total: fechedFields?.total },
        ]);
      } else {
        setContentfulData(fechedFields);
      }
    };
    getDataFromContentful();
  }, [slug, skip, props.filter]);

  return (
    <>
      {contentfulData &&
        contentfulData?.map((element: any, index: number) => {
          return (
            <ContentfulMainContainerComponent
              key={index}
              {...element}
              slug={slug}
              setSkip={setSkip}
              onChangeFilter={onChangeFilter}
              filter ={props.filter}
            />
          );
        })}
    </>
  );
};
export default ContentfulMainComponent;
