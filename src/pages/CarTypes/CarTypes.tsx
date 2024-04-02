import apiRoutes from "@/api";
import DeleteModal from "@/components/DeleteModel";
import { PageContainer } from "@/components/containers";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { ModalStates } from "@/types";
import { CarModelData } from "@/types/carModel";
import { CarTypeDate } from "@/types/carType";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import AddCarTypes from "./AddCarTypes";

function CarTypes() {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-car-type"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.carType.index);
      return data.data;
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState<CarTypeDate>();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [modalState, setModalState] = useState<ModalStates>(null);
  const cols: TableColumn<CarTypeDate>[] = [
    {
      id: "gear",
      name: "معدات",
      cell: (row) => <div title={row.gear}>{row.gear}</div>,
    },
    {
      id: "fuel",
      name: "الوقود",
      cell: (row) => <div title={row.gear}>{row.fuel}</div>,
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
            apiPath={apiRoutes.carType.buttons.delete(row.id!)}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  console.log(data);
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
              <p>إضافة نوع سيارات </p>
            </>
          ),
        }}
      />

      {(modalState === "add" || modalState === "edit") && (
        <AddCarTypes
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
    </>
  );
}

export default CarTypes;
