import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFieldsBySysId } from "../../../services/contentfulService";
import { getImageTitle, getImageUrl } from "../../util/commonFunctions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./Product.css";

const ProductDetails = (element: any) => {
  const { id } = useParams();
  const [contentfulData, setContentfulData] = useState<any>([]);

  useEffect(() => {
    const getDataFromContentful = async () => {
      const fechedFields = await fetchFieldsBySysId({ id: id || "" });
      setContentfulData(fechedFields?.[0]);
    };
    getDataFromContentful();
  }, [id]);
  const { image, name, price, description } = contentfulData;
  return (
    <>
      <div className="margin-20-px productDetailsContainer">
        <div className="row">
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
            <img
              src={getImageUrl(image?.[0])}
              className="productDetailsImage"
              alt={getImageTitle(image?.[0])}
            />
          </div>
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7">
            <h3>{name}</h3>
            <b>₹{price}</b>
            {documentToReactComponents(description)}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
