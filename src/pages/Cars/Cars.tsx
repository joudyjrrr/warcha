import apiRoutes from "@/api";
import DeleteModal from "@/components/DeleteModel";
import { PageContainer } from "@/components/containers";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { ModalStates } from "@/types";
import { CarTypeDate } from "@/types/carType";
import { CarsData } from "@/types/cars";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

function Cars() {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-cars"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.cars.index);
      return data.data;
    },
  });

  console.log(data);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState<CarsData>();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [modalState, setModalState] = useState<ModalStates>(null);
  const cols: TableColumn<CarsData>[] = [
    {
      id: "image.file_name",
      name: "الصورة",
      cell: (row) => (
        <img
          src={`https://warsha.htc-company.com/public/getImage/${row.image?.id}/${row.image?.file_name}`}
        />
      ),
    },
    {
      id: "name",
      name: "الاسم",
      cell: (row) => <div title={row.name}>{row.name}</div>,
    },
    {
      id: "car_company.name",
      name: "اسم الشركة",
      cell: (row) => <div title={row.name}>{row.car_company.name}</div>,
    },
    {
      id: "car_company.name",
      name: "نوع السيارة",
      cell: (row) => <div>{row.car_type.gear}</div>,
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
            apiPath={apiRoutes.cars.buttons.delete(row.id!)}
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
              <p>إضافة سيارات</p>
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
        breadcrumb={[{ title: " السارات" }]}
      ></PageContainer>
    </>
  );
}

export default Cars;
