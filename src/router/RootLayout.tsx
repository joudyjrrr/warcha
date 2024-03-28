import { SideBar } from "@/components/ui/Layout";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
export default function RootLayout() {
  return (
    <>
      <Toaster className="text-primary" />
      <SideBar />
      <Outlet />
    </>
  );
}
