import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Cart = React.lazy(() => import("./components/Cart/Cart"));
const Orders = React.lazy(() => import("./components/Orders/Orders"));
const Header = React.lazy(() => import("./components/Header"));
const Footer = React.lazy(() => import("./components/Footer"));
const ProductDetails = React.lazy(
  () =>
    import("./components/contentfulComponents/ProductComponent/PorductDetails")
);
const Home = React.lazy(() => import("./components/Home"));
const Payment= React.lazy(() => import("./components/Payment"));
const PaymentStatus= React.lazy(() => import("./components/PaymentStatus"));
const Auth = React.lazy(() => import("./components/auth/Auth"));

const NotFound = React.lazy(() => import("./components/NotFound"));

const allRoutes = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Suspense fallback={<h1>Loading....</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-status" element={<PaymentStatus />}/>
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
