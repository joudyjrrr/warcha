import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@/assets/style/style.min.css";
import StoreProvider from "./lib/StoreProvider.tsx";
import { RouterProvider } from "react-router-dom";
import Routes from "./router/routes/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Routes()} />
      </QueryClientProvider>
    </StoreProvider>
  </React.StrictMode>
);
