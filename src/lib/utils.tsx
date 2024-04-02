import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RiCoinsLine, RiHome2Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NavigationProject = [
  {
    title: "الإعدادات",
    icon: <RiHome2Line size={"1.5rem"} className="me-4" />,
    path:"/settings",
    list: [
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
    ],
  },
  {
    titleLink: "الرئيسية",
    icon: <RiHome2Line size={"1.5rem"} className="me-4" />,
    path: "/",
    query: "",
  },
  {
    titleLink: "العملات",
    path: "/currencies",
    icon: <RiCoinsLine size={"1.5rem"} className="me-4" />,
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
];
