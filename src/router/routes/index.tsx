import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import RootLayout from "../RootLayout";

export default function Routes() {
  const Currencies = lazy(() => import("../../pages/Currencies/Currencies"));
  const PayTypes = lazy(() => import("../../pages/PayTypes/PayTypes"));
  const Suppliers = lazy(() => import("../../pages/Suppliers/Suppliers"));
  const ProductCategory = lazy(() => import("../../pages/productCategory/ProductCategory"));


  return createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <h1>hi</h1> },
        { path: "/currencies", element: <Currencies /> },
        { path: "/pay-types", element: <PayTypes /> },
        { path: "/suppliers", element: <Suppliers /> },
        { path: "/product-category", element: <ProductCategory /> },

      ],
    },
  ]);
}
