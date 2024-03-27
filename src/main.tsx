import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@/assets/style/style.min.css'
import StoreProvider from './lib/StoreProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import Routes from './router/routes/index.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={Routes()} />
    </StoreProvider>
  </React.StrictMode>
);
