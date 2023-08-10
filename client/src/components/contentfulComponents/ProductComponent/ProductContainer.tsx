import Product from "./Product";

const ProductContainer = (element: any) => {
  const { products } = element;
  return (
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
    </div>
  );
};
export default ProductContainer;
