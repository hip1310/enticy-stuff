import React from "react";
import { SLUGS } from "./util/constant";
const ContentfulMainComponent = React.lazy(
  () => import("./contentfulComponents/ContentfulMainComponent")
);

const Header = () => {
  return <ContentfulMainComponent slug={SLUGS.HEADER} />;
};

export default Header;
