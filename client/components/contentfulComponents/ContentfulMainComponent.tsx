import { fetchFields } from "../../services/contentfulService";
import { useState, useEffect } from "react";
import ContentfulMainContainerComponent from "./ContentfulMainContainerComponent";
import { SLUGS } from "../../util/constant";

type propsType = {
  slug: string;
  limit?: number;
  fetchItems?: boolean;
  filter?: Object;
  onChangeFilter?: (key: string, value: string) => void;
};

const ContentfulMainComponent = (props: propsType) => {
  const { slug, limit, fetchItems, onChangeFilter } = props;
  const [contentfulData, setContentfulData] = useState<any>([]);
  const [skip, setSkip] = useState<number>(0);

  useEffect(() => {
    // Fetch data from Contentful based on provided parameters
    const getDataFromContentful = async () => {
      const fechedFields = await fetchFields({
        contentType: slug || SLUGS.PRODUCT,
        skip: skip,
        limit: limit,
        fetchItems: fetchItems,
        query: slug !== SLUGS.FILTER && props.filter,
      });

      if (slug === SLUGS.PRODUCT) {
        // If the slug is 'PRODUCT', assume the data contains products
        setContentfulData([
          { products: fechedFields?.items, total: fechedFields?.total },
        ]);
      } else {
        // For other slugs, store the fetched data as-is
        setContentfulData(fechedFields);
      }
    };

    // Call the data fetching function
    getDataFromContentful();
  }, [slug, skip, props.filter]);

  return (
    <>
      {contentfulData &&
        contentfulData?.map((element: any, index: number) => {
          return (
            // Render ContentfulMainContainerComponent for each set of data
            <ContentfulMainContainerComponent
              key={index}
              {...element}
              slug={slug}
              setSkip={setSkip}
              onChangeFilter={onChangeFilter}
              filter={props.filter}
            />
          );
        })}
    </>
  );
};

export default ContentfulMainComponent;
