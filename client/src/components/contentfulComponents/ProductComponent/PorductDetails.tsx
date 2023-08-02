import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFieldsBySysId } from "../../../services/contentfulService";
import { getImageUrl } from "../../util/commonFunctions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../auth/logoutButton";
import LoginButton from "../../auth/loginButton";

const ProductDetails = (element: any) => {
  const { id } = useParams();
  const [contentfulData, setContentfulData] = useState<any>([]);
  const { isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    const getDataFromContentful = async () => {
      const fechedFields = await fetchFieldsBySysId({ id: id || "" });
      setContentfulData(fechedFields?.[0]);
    };
    getDataFromContentful();
  }, [id]);
  const { image, name, price, description } = contentfulData;
  return (
    <div className="margin-20-px">
      <div className="row ">
        <div className="col-5">
          <img
            src={getImageUrl(image?.[0])}
            style={{
              width: "100%",
              height: "510px",
              objectFit: "fill",
            }}
          />
        </div>
        <div className="col-7">
          <h3>{name}</h3>
          <b>₹{price}</b>
          {documentToReactComponents(description)}

          {!isLoading && (
            <>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
