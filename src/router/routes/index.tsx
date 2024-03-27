import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

export default function Routes() {
  const Currencies = lazy(() => import("../../pages/Currencies/Currencies"));
  return createBrowserRouter([
    {
      path: "/",
      children: [
        { path: "/", element: <h1>hi</h1> },
        { path: "/currencies", element: <Currencies /> },
      ],
    },
  ]);
}
