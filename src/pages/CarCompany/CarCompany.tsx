import apiRoutes from "@/api";
import { PageContainer } from "@/components/containers";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { ModalStates } from "@/types";
import { CarCompanyData } from "@/types/carCompany";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import AddCarCompany from "./AddCarCompany";
import { DeleteModal, ShowImageModel } from "@/components/dialog";

function CarCompany() {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-car-company"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.carCompany.index);
      return data.data;
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState<CarCompanyData>();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [modalState, setModalState] = useState<ModalStates>(null);

  const cols: TableColumn<CarCompanyData>[] = [
    {
      id: "name",
      name: "الاسم",
      cell: (row) => <div title={row.name}>{row.name}</div>,
    },
    {
      id: "country",
      name: "البلد",
      cell: (row) => <div>{row.country}</div>,
    },
    {
      id: "created_at",
      name: "تاريخ الانشاء",
      cell: (row) => (
        <div title={row.created_at}>
          {moment(row.created_at).format("YYYY/MMMM/DDDD")}
        </div>
      ),
    },
    {
      id: "image.file_name",
      name: "الصورة",
      cell: (row) => (
        <ShowImageModel
          image={{
            url: `https://warsha.htc-company.com/public/getImage/${row.image?.id}/${row.image?.file_name}`,
            name: row.image?.file_name,
          }}
        />
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
            apiPath={apiRoutes.carCompany.buttons.delete(row.id!)}
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
              <p>إضافة شركة سيارات</p>
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
        breadcrumb={[{ title: "شركات السارات" }]}
      ></PageContainer>
      {(modalState === "add" || modalState === "edit") && (
        <AddCarCompany
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
    </>
  );
}

export default CarCompany;
