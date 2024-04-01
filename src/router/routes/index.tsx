import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import RootLayout from "../RootLayout";
import ServiceDepartments from "@/pages/ServiceDepartments/ServiceDepartments";

export default function Routes() {
  const Currencies = lazy(() => import("../../pages/Currencies/Currencies"));
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
        { path: "/service-department", element: <ServiceDepartments /> },
        { path: "/employee-type", element: <EmployeeTypes /> },
        { path: "/banch-expens", element: <BranchExpens /> },
        { path: "/banches", element: <Branches /> },
        { path: "/car-color", element: <CarColor /> },
        { path: "/car-model", element: <CarModel /> },
        { path: "/car-company", element: <CarCompany /> },
        { path: "/car-types", element: <CarTypes /> },
      ],
    },
  ]);
}
