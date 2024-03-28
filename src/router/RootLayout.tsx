import { SideBar } from "@/components/ui/Layout";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}
