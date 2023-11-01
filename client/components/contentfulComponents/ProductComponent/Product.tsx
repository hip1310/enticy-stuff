import Link from "next/link";
import { getImageUrl } from "../../../util/commonFunctions";

const Product = ( element: any) => {
  // Destructure properties from the 'element' object
  const { name, price, productId, category, image } = element;

  // Extract image-related properties
  const imageDescription = image?.[0]?.fields?.description;
  const imageId = image?.[0]?.sys?.id;

  // Determine background color from the image description if available
  const backgroundColor = imageDescription ? JSON.parse(imageDescription)?.background : undefined;

  return (
    <div>
      <Link href={`/product/${productId}`}>
        <img
          id={imageId}
          src={getImageUrl(image?.[0])}
          alt={name}
          className="w-full h-56 object-cover hover:scale-105 transition duration-500 mx-auto w-52 h-28"
          style={{ backgroundColor: backgroundColor || "unset"}}
        />
      </Link>
      {/* Display the product name */}
      <p className="text-center mb-0">{name}</p>
      {/* Display the product category (if available) */}
      {category && <p className="text-center mb-0">{category}</p>}
      {/* Display the product price (if available) */}
      {price && <p className="text-center mb-0"><b>₹{price}</b></p>}
    </div>
  );
};

export default Product;
