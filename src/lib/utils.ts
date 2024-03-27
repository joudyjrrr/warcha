import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const NavigationProject = [
  {
    titleLink: "الرئيسية",
    path: "/",
    query: "",
  },
  {
    titleLink: "المنتجات",
    path: "/products",
    query: "",
  },
  {
    titleLink: "الرئيسية",
    path: "/",
    query: "",
  },
  {
    title: "الأقسام",
    path: "/categories",
    query: "",
    list: [
      {
        titleLink: "2الرئيسية",
        path: "/",
        query: "",
      },
      {
        titleLink: "3الرئيسية",
        path: "/",
        query: "",
      },
    ],
  },
];