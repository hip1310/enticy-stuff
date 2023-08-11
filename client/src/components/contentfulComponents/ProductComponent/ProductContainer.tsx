import { PRODUCT_PAGE_LIMIT, SLUGS } from "../../util/constant";
import ContentfulMainComponent from "../ContentfulMainComponent";
import Pagination from "../PaginationComponent/Pagination";
import Product from "./Product";

const ProductContainer = (element: any) => {
  const { products, setSkip, total } = element;
  return (
    <div className="row producttPageMainContainer">
      <div className="col-2">
        <ContentfulMainComponent slug={SLUGS.FILTER} />
      </div>
      <div className="col-10">
        <div className="row productContainer">
          {products?.map((element: any, index: number) => {
            return (
              <Product
                key={index}
                {...element?.fields}
                productId={element?.sys?.id}
              />
            );
          })}
          <Pagination setSkip={setSkip} total={total} limit={PRODUCT_PAGE_LIMIT} />
        </div>
      </div>
    </div>
  );
};
export default ProductContainer;
