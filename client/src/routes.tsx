import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Header = React.lazy(() => import("./components/Header"));
const Footer = React.lazy(() => import("./components/Footer"));
const ProductDetails = React.lazy(
  () =>
    import("./components/contentfulComponents/ProductComponent/PorductDetails")
);
const Home = React.lazy(() => import("./components/Home"));
const Auth = React.lazy(() => import("./components/auth/Auth"));

const NotFound = React.lazy(() => import("./components/NotFound"));

const allRoutes = () => {
  // if (window.location.pathname === "/") {
  //   window.location.href = "/product";
  // }
  return (
    <>
      <Header />
      <BrowserRouter>
        <Suspense fallback={<h1>Loading....</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/signin" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default allRoutes;
