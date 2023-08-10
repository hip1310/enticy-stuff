const Product = (element: any) => {
  const { name, redirectionUrl, products } = element;
  return (
    <div
      className="header"
      onClick={() =>
        redirectionUrl ? (window.location.href = redirectionUrl) : ""
      }
    >
      {name}
      {products && (
        <>
          <div className="header-products">
            {products.map((productElement: any, index: number) => {
              // return <a key={index} href={`/products/${productElement?.fields?.category}`}>{productElement?.fields?.name}</a>
              return (
                <a key={index} href={`/product`}>
                  {productElement?.fields?.name}
                </a>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default Product;
