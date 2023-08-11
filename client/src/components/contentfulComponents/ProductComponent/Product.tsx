import { getImageUrl } from "../../util/commonFunctions";
import "./Product.css";

const Product = (element: any) => {
  const imageDescription = element?.image?.[0]?.fields?.description;
  const imageId = element?.image?.[0]?.sys?.id;
  const backgroundColor =
    imageDescription && JSON.parse(imageDescription)?.background;
  const { name, price, productId } = element;

  return (
    <div className="col-xs-2 col-sm-3 col-md-3 col-lg-3 product">
      <img
        id={imageId}
        src={getImageUrl(element?.image?.[0])}
        alt={name}
        className="productImage"
        style={{
          backgroundColor: backgroundColor || "unset",
        }}
        onClick={() => {
          window.location.href = "/product/" + productId;
        }}
        onMouseOver={() => {
          const selectedImage = document.getElementById(imageId);
          if (typeof selectedImage !== "undefined" && selectedImage !== null) {
            selectedImage.style.objectFit = "cover";
          }
        }}
        onMouseOut={() => {
          const selectedImage = document.getElementById(imageId);
          if (typeof selectedImage !== "undefined" && selectedImage !== null) {
            selectedImage.style.objectFit = "contain";
          }
        }}
      />
      <p className="productName">{name}</p>
      <p className="productName">{element?.category}</p>
      {price && (
        <p className="productPrice">
          <b>₹{price}</b>
        </p>
      )}
    </div>
  );
};
export default Product;
