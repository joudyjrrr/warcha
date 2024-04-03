import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RiCoinsLine, RiHome2Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { IconType } from "react-icons/lib";
import { ReactNode } from "react";
import { SettingsIcons } from "@/assets/svgs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type NavigationProjectProps = {
  title?: string;
  icon?: ReactNode;
  path: string;
  list?: NavigationProjectProps[];
  titleLink?: string;
  query?: string;
};
export const NavigationProject: NavigationProjectProps[] = [
  {
    titleLink: "الرئيسية",
    icon: <RiHome2Line size={"1.5rem"} className="me-4" />,
    path: "/",
    query: "",
  },
 
  {
    titleLink: "طرق الدفع",
    path: "/pay-types",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    titleLink: "المزودين",
    path: "/suppliers",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    titleLink: "أنواع الخدمات",
    path: "/service-department",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    titleLink: "أنواع المنتجات",
    path: "/product-category",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    titleLink: "أنواع الموظفين",
    path: "/employee-type",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    titleLink: "الفروع",
    path: "/banches",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    titleLink: "نفقات الفروع",
    path: "/banch-expens",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    titleLink: "موديل السيارات",
    path: "/car-model",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    titleLink: "ألوان السيارات",
    path: "/car-color",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    titleLink: "شركات السيارات",
    path: "/car-company",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    titleLink: "أنواع السيارات",
    path: "/car-types",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    titleLink: "المنتجات",
    path: "/products",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
  {
    title: "الإعدادات",
    icon: <SettingsIcons />,
    path: "/settings",
    list: [
      {
        titleLink: "الإشعارات",
        path: "/notifications",
        query: "",
      },
      {
        titleLink: "الوحدات",
        path: "/unites",
        query: "",
      },
      {
        titleLink: "الموقع",
        path: "/locations",
        query: "",
      },
      {
        titleLink: "التقارير",
        path: "/reports",
        query: "",
      },
      {
        titleLink: "العملات",
        path: "/currencies",
        query: "",
      },
    ],
  },
];
