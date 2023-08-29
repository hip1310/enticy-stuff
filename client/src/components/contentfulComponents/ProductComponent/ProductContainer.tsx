import { PRODUCT_PAGE_LIMIT, SLUGS } from "../../util/constant";
import ContentfulMainComponent from "../ContentfulMainComponent";
import Pagination from "../PaginationComponent/Pagination";
import Product from "./Product";

const ProductContainer = (element: any) => {
  const { products, setSkip, total } = element;
  return (
    <div className="row producttPageMainContainer">
      <div className="col-5 col-sm-3 col-md-3 col-lg-2">
        <ContentfulMainComponent slug={SLUGS.FILTER} />
      </div>
      <div className="col-7 col-sm-9 col-md-9 col-lg-10">
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
