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
import { CirclePicker } from "react-color";
import { FaPlus } from "react-icons/fa6";
import DeleteModal from "@/components/DeleteModel";
import { Button } from "@/components/ui/button";
import { CarColorData } from "@/types/CarColor";
import AddCarColor from "./AddCarColor";

const CarColor = () => {
  const { data, isFetching, error , refetch } = useQuery({
    queryKey: ["get-car-color"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.CarColor.index);
      return data.data;
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState<CarColorData>();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [modalState, setModalState] = useState<ModalStates>(null);

  const cols: TableColumn<CarColorData>[] = [
    {
      id: "color",
      name: "اللون",
      cell: (row) => <div title={row.value}>{row.color}</div>,
    },
    {
      id: "code",
      name: "اللون",
      cell: (row) => (
        <div
          className={`w-[30px] h-[30px] rounded-lg`}
          style={{
            background: row.code,
          }}
        ></div>
      ),
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
            apiPath={apiRoutes.CarColor.buttons.delete(row.id!)}
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
        breadcrumb={[{ title: "ألوان السيارات" }]}
        addFunction={{
          click() {
            setModalState("add");
          },
          children: (
            <>
              <FaPlus className="text-white text-md" />
              <p>إضافة لون </p>
            </>
          ),
        }}
      />
        {(modalState === "add" || modalState === "edit") && (
        <AddCarColor
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
    </>
  );
};

export default CarColor;
