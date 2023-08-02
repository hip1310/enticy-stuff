import { getImageUrl } from "../../util/commonFunctions";

const Product = (element: any) => {
  const imageDescription = element?.image?.[0]?.fields?.description;
  const imageId = element?.image?.[0]?.sys?.id;
  const backgroundColor =
    imageDescription && JSON.parse(imageDescription)?.background;
  const { name, price, productId } = element;

  return (
    <div className="col-sm-2 col-md-3 col-lg-3" style={{ cursor: "pointer" }}>
      <img
        id={imageId}
        src={getImageUrl(element?.image?.[0])}
        alt={name}
        style={{
          width: "100%",
          height: "221px",
          objectFit: "fill",
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
            selectedImage.style.objectFit = "fill";
          }
        }}
      />
      <p style={{ textAlign: "center", marginBottom: "0" }}>{name}</p>
      <p style={{ textAlign: "center", marginBottom: "0" }}>
        <b>₹{price}</b>
      </p>
    </div>
  );
};
export default Product;
