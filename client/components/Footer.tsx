import React, { lazy } from "react";
import { SLUGS } from "../util/constant";

// Lazy load the ContentfulMainComponent for better performance
const ContentfulMainComponent = lazy(() => import("./contentfulComponents/ContentfulMainComponent"));

const Footer = () => {
  return (
    <ContentfulMainComponent slug={SLUGS.FOOTER} />
  );
};

export default Footer;
