import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RiCoinsLine, RiHome2Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NavigationProject = [
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
    titleLink: "نفقات الفروع",
    path: "/banch-expens",
    icon: <MdPayment size={"1.5rem"} className="me-4" />,
    query: "",
  },
];
