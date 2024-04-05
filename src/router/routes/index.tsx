import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import RootLayout from "../RootLayout";
import ServiceDepartments from "@/pages/ServiceDepartments/ServiceDepartments";

export default function Routes() {
  const Currencies = lazy(() => import("../../pages/Currencies/Currencies"));
  const Units = lazy(() => import("../../pages/Units/Units"));
  const ShowUnit = lazy(() => import("../../pages/Units/ShowUnit"));
  const PayTypes = lazy(() => import("../../pages/PayTypes/PayTypes"));
  const Suppliers = lazy(() => import("../../pages/Suppliers/Suppliers"));
  const ProductCategory = lazy(
    () => import("../../pages/productCategory/ProductCategory")
  );
  const EmployeeTypes = lazy(
    () => import("../../pages/EmplyeeType/EmployeeType")
  );
  const BranchExpens = lazy(
    () => import("../../pages/BranchExpens/BranchExpens")
  );
  const Branches = lazy(() => import("../../pages/Branches/Branches"));
  const CarModel = lazy(() => import("../../pages/CarModel/CarModel"));
  const CarColor = lazy(() => import("../../pages/CarColor/CarColor"));
  const CarCompany = lazy(() => import("../../pages/CarCompany/CarCompany"));
  const CarTypes = lazy(() => import("../../pages/CarTypes/CarTypes"));
  const Cars = lazy(() => import("../../pages/Cars/Cars"));
  const Products = lazy(() => import("../../pages/Products/Products"));
  const AddProduct = lazy(() => import("../../pages/Products/Products"));
  const ShowProduct = lazy(() => import("../../pages/Products/ShowProduct"));

  return createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <h1>hi</h1> },
        { path: "/settings/currencies", element: <Currencies /> },
        { path: "/settings/units", element: <Units /> },
        { path: "/settings/units/:unitId", element: <ShowUnit /> },
        { path: "/pay-types", element: <PayTypes /> },
        { path: "/suppliers", element: <Suppliers /> },
        { path: "/product-category", element: <ProductCategory /> },
        { path: "/service-department", element: <ServiceDepartments /> },
        { path: "/employee-type", element: <EmployeeTypes /> },
        { path: "/banch-expens", element: <BranchExpens /> },
        { path: "/banches", element: <Branches /> },
        { path: "/car-color", element: <CarColor /> },
        { path: "/car-model", element: <CarModel /> },
        { path: "/car-company", element: <CarCompany /> },
        { path: "/car-types", element: <CarTypes /> },
        { path: "/cars", element: <Cars /> },
        { path: "/products", element: <Products /> },
        { path: "/products/:productId", element: <ShowProduct /> },
        { path: "/products/add", element: <AddProduct /> },
        { path: "/products/Edit/:id", element: <AddProduct /> },
      ],
    },
  ]);
}
