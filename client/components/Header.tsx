import React, { lazy } from "react";
import { SLUGS } from "../util/constant";

// Lazy load the ContentfulMainComponent for better performance
const ContentfulMainComponent = lazy(() => import("./contentfulComponents/ContentfulMainComponent"));

const Header = () => {
  return (
    <ContentfulMainComponent slug={SLUGS.HEADER} />
  );
};

export default Header;
