import React from "react";
import { SLUGS } from "./util/constant";
const ContentfulMainComponent = React.lazy(
  () => import("./contentfulComponents/ContentfulMainComponent")
);

const Footer = () => {
  return <ContentfulMainComponent slug={SLUGS.FOOTER} />;
};

export default Footer;
