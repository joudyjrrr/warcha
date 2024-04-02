import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "./index.css";
import "@/assets/style/style.min.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./router/routes/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<p>loading</p>}>
      {/* <StoreProvider> */}
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Routes()} />
        </QueryClientProvider>
      {/* </StoreProvider> */}
    </Suspense>
  </React.StrictMode>
);
