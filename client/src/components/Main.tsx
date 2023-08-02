import { useParams } from "react-router-dom";
import { fetchFields } from "../services/contentfulService";
import { useState, useEffect } from "react";
import MainContainer from "./MainContainer";
const Main = () => {
  const { slug } = useParams();
  const [contentfulData, setContentfulData] = useState<any>([]);

  useEffect(() => {
    const getDataFromContentful = async () => {
      const fechedFields = await fetchFields({ contentType: slug || "productContainer" });
      setContentfulData(fechedFields);
    };
    getDataFromContentful();
  }, [slug]);

  return (
    <div className="main-conainer">
      {contentfulData &&
        contentfulData?.map((element: any, index: number) => {
          return <MainContainer key={index} {...element} />;
        })}
    </div>
  );
};
export default Main;
