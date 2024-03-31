import { PageContainer } from "@/components/containers";
import { useQuery } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import moment from "moment";
import { ModalStates, SupplierData } from "@/types";
import "moment/locale/ar";
import axios from "@/lib/axios";
import apiRoutes from "@/api";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import AddSupplier from "./AddSupplier";
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import DeleteModal from "@/components/DeleteModel";
const Suppliers = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["get-suppliers"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.supplier.index);
      return data.data;
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [selectedRow, setSelectedRow] = useState<SupplierData>();
  const [modalState, setModalState] = useState<ModalStates>(null);

  const cols: TableColumn<SupplierData>[] = [
    {
      id: "name",
      name: "اسم المزود",
      cell: (row) => <div title={row.name}>{row.name}</div>,
    },
    {
      id: "phone",
      name: "رقم الموبايل",
      cell: (row) => <div title={row.phone}>{row.phone}</div>,
    },
    {
      id: "opening_balance",
      name: "الرصيد الافتتاحي",
      cell: (row) => (
        <div title={row.opening_balance}>{row.opening_balance}</div>
      ),
    },
    {
      id: "opening_balance",
      name: "الرصيد",
      cell: (row) => <div title={row.money}>{row.money}</div>,
    },
    {
      id: "created_at",
      name: "تاريخ الانشاء",
      cell: (row) => (
        <div title={moment(row.created_at).format("YYYY/MMMM/DDDD")}>
          {moment(row.created_at).format("YYYY/MMMM/DDDD")}
        </div>
      ),
    },
    {
      id: "updated_at",
      name: "آخر تعديل",
      cell: (row) => (
        <div title={moment(row.updated_at).format("YYYY/MMMM/DDDD")}>
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
          apiPath={apiRoutes.supplier.buttons.delete(row.id!)}
          refetch={() => {}}
        />
      </div>
      ),
    },
  ];
  return (
    <PageContainer
      addFunction={{
        click() {
          setModalState("add");
        },
        children: (
          <>
            <FaPlus className="text-white text-md" />
            <p>إضافة مزود</p>
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
      breadcrumb={[{ title: "المزودين" }]}
    >
      {(modalState === "add" || modalState === "edit") && (
        <AddSupplier
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
    </PageContainer>
  );
};

export default Suppliers;
