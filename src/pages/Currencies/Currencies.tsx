import { PageContainer } from "@/components/containers";
import { useQuery } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import { CurrencyData, ModalStates } from "@/types";
import "moment/locale/ar";
import axios from "@/lib/axios";
import { FaPlus } from "react-icons/fa6";
import apiRoutes from "@/api";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import AddCurrecis from "./AddCurrency";
import { CurrencyFormData } from "@/types/currency";
import { Button } from "@/components/ui/button";
import DeleteModal from "@/components/DeleteModel";
const Currencies = () => {
  const { data, isFetching, error  , refetch} = useQuery({
    queryKey: ["get-currencies"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.currency.index + `?paginate=25`);
      return data.data;
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState<CurrencyFormData>();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [modalState, setModalState] = useState<ModalStates>(null);

  const cols: TableColumn<CurrencyData>[] = [
    {
      id: "currency",
      name: "اسم العملة ",
      cell: (row) => <div title={row.currency}>{row.currency}</div>,
    },
    {
      id: "dollar_price",
      name: "سعر بالدولار",
      cell: (row) => (
        <div title={row.dollar_price.toString()}>{row.dollar_price}</div>
      ),
    },
    {
      id: "created_at",
      name: "تاريخ الانشاء",
      cell: (row) => (
        <div title={row.currency}>
          {moment(row.created_at).format("YYYY/MMMM/DDDD")}
        </div>
      ),
    },
    {
      id: "updated_at",
      name: "آخر تعديل",
      cell: (row) => (
        <div title={row.currency}>
          {moment(row.updated_at).format("YYYY/MMMM/DDDD")}
        </div>
      ),
    },
    {
      id: "actions",
      name: "التحكم",
      cell: (row) => (
        <div className="flex justify-center  items-center text-center cursor-pointer">
        <Button
        variant={"link"}
          onClick={() => {
            setModalState("edit");
            setSelectedRow(row);
          }}
        >
          <FiEdit className="text-primary text-lg hover:text-pretty" />
        </Button>
        <DeleteModal
          MassegeSuccess="تم الحذف بنجاح"
          apiPath={apiRoutes.currency.buttons.delete(row.id!)}
          refetch={refetch}
        />
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
              <FaPlus className="text-white text-md" />
              <p>إضافة عملة</p>
            </>
          ),
        }}
        table={{
          columns: cols,
          data: data?.data ?? [],
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
      {(modalState === "add" || modalState === "edit") && (
        <AddCurrecis
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
    </>
  );
};

export default Currencies;
