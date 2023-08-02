import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/contentfulComponents/ProductComponent/PorductDetails";
const Main = React.lazy(() => import("./components/Main"));
const NotFound = React.lazy(() => import("./components/NotFound"));

const allRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading....</h1>}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:slug" element={<Main />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default allRoutes;
