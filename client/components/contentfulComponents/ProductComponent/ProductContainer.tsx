import { PRODUCT_PAGE_LIMIT, SLUGS } from "../../../util/constant";
import ContentfulMainComponent from "../ContentfulMainComponent";
import Pagination from "../PaginationComponent/Pagination";
import Product from "./Product";

const ProductContainer = (element: any) => {
  const { products, setSkip, total, onChangeFilter, filter } = element;
  return (
    <div className="mt-20 w-full">
      {/* Render the ContentfulMainComponent for filtering */}
      <ContentfulMainComponent
        slug={SLUGS.FILTER}
        onChangeFilter={onChangeFilter}
        filter={filter}
      />
      <div className="pl-3 w-full md:w-[calc(100%-180px)] float-right pr-5 pb-24">
        {/* Render the list of products */}
        <div className="grid grid-flow-row-dense md:grid-cols-4 sm:grid-cols-2 gap-4 place-items-center mt-auto">
          {products?.map((element: any, index: number) => {
            return (
              <Product
                key={index}
                {...element?.fields}
                productId={element?.sys?.id}
              />
            );
          })}
        </div>
        {/* Render the pagination component */}
        <div className="pt-3">
          <Pagination
            setSkip={setSkip}
            total={total}
            limit={PRODUCT_PAGE_LIMIT}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductContainer;
