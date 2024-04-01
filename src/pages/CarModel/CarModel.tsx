import apiRoutes from "@/api";
import axios from "@/lib/axios";
import { ModalStates } from "@/types";
import { CarModelData } from "@/types/carModel";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useSearchParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { PageContainer } from "@/components/containers";
import AddCarMode from "./AddCarMode";
import { FaPlus } from "react-icons/fa6";
import DeleteModal from "@/components/DeleteModel";
import { Button } from "@/components/ui/button";

const CarModel = () => {
  const { data, isFetching, error , refetch } = useQuery({
    queryKey: ["get-car-model"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.CarMode.index);
      return data.data;
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState<CarModelData>();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [modalState, setModalState] = useState<ModalStates>(null);

  const cols: TableColumn<CarModelData>[] = [
    {
      id: "currency",
      name: "القيمة",
      cell: (row) => <div title={row.value}>{row.value}</div>,
    },

    {
      id: "created_at",
      name: "تاريخ الانشاء",
      cell: (row) => (
        <div>{moment(row.created_at).format("YYYY/MMMM/DDDD")}</div>
      ),
    },
    {
      id: "updated_at",
      name: "آخر تعديل",
      cell: (row) => (
        <div>{moment(row.updated_at).format("YYYY/MMMM/DDDD")}</div>
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
            apiPath={apiRoutes.CarMode.buttons.delete(row.id!)}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <PageContainer
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
        breadcrumb={[{ title: "موديل السيارات" }]}
        addFunction={{
          click() {
            setModalState("add");
          },
          children: (
            <>
              <FaPlus className="text-white text-md" />
              <p>إضافة موديل </p>
            </>
          ),
        }}
      />

      {(modalState === "add" || modalState === "edit") && (
        <AddCarMode
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
    </>
  );
};

export default CarModel;
