import { PageContainer } from "@/components/containers";
import { useQuery } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import { CurrencyData, TModalState } from "@/types";
import "moment/locale/ar";
import axios from "@/lib/axios";
import { FaPlus } from "react-icons/fa6";
import apiRoutes from "@/api";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ICurrency } from "@/types/currency";
import AddProductCategory from "./AddProductCategory";
import { IProductCatgory } from "@/types/productCategory";
const ProductCategory = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["get-prod-cat"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.productCatgory.index);
      return data.data;
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState<IProductCatgory>();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [modalState, setModalState] = useState<TModalState>(null);

  const cols: TableColumn<IProductCatgory>[] = [
    {
      id: "name",
      name: "الاسم",
      cell: (row) => <div>{row.name}</div>,
    },
    {
      id: "image.file_name",
      name: "الصورة",
      cell: (row) => <img src={`https://warsha.htc-company.com/public/getImage/${row.image?.file_name}`}/>
    },
    {
      id: "created_at",
      name: "تاريخ الانشاء",
      cell: (row) => (
        <div>
          {moment(row.created_at).format("YYYY/MMMM/DDDD")}
        </div>
      ),
    },
    {
      id: "updated_at",
      name: "آخر تعديل",
      cell: (row) => (
        <div >
          {moment(row.updated_at).format("YYYY/MMMM/DDDD")}
        </div>
      ),
    },
    {
      id: "updated_at",
      name: "التحكم",
      cell: (row) => (
        <div
          onClick={() => {
            setModalState("edit");
            setSelectedRow(row);
          }}
          className="flex justify-center items-center text-center cursor-pointer"
        >
          <FiEdit className="text-gray text-lg hover:text-pretty" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageContainer
        addFunction={{
          click() {
            setModalState("add");
          },
          children: (
            <>
              <Button>
                أضافة نوع منتج <FaPlus className="text-white text-md" />
              </Button>
            </>
          ),
        }}
        table={{
          columns: cols,
          data: data ?? [],
          loading: isFetching,
          error: error,
          paginationProps: {
            paginationPage: {
              activePage: searchParams.get("page") || paginationPage.activePage,
              perPage: searchParams.get("perPage") || paginationPage.perPage,
            },
            paginationTotal: 0,
            setPaginationPage: setPaginationPage,
          },
        }}
        breadcrumb={[{ title: "العملات" }]}
      ></PageContainer>
      {(modalState === "add" || modalState === "edit")&& (
        <AddProductCategory
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
        
      )}
    </>
  );
};

export default ProductCategory;
