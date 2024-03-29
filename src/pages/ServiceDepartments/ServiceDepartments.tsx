import { PageContainer } from "@/components/containers";
import { useQuery } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import moment from "moment";
import {
  ModalStates,
  ServiceDepartmentData
} from "@/types";
import "moment/locale/ar";
import axios from "@/lib/axios";
import apiRoutes from "@/api";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import AddServiceDepartment from "./AddServiceDepartment";
const ServiceDepartments = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["get-service-departments"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.serviceDepartment.index);
      return data.data;
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [selectedRow, setSelectedRow] = useState<ServiceDepartmentData>();
  const [modalState, setModalState] = useState<ModalStates>(null);

  const cols: TableColumn<ServiceDepartmentData>[] = [
    {
      id: "name",
      name: "اسم الخدمة",
      cell: (row) => <div title={row.name}>{row.name}</div>,
    },

    {
      id: "description",
      name: "وصف الخدمة",
      cell: (row) => <div title={row.description}>{row.description}</div>,
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
  console.log("data: ", data);
  return (
    <PageContainer
      addFunction={{
        click() {
          setModalState("add");
        },
        children: (
          <>
            <FaPlus className="text-white text-md" />
            <p>إضافة خدمة</p>
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
      breadcrumb={[{ title: "المزودين" }]}
    >
      {(modalState === "add" || modalState === "edit") && (
        <AddServiceDepartment
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
    </PageContainer>
  );
};

export default ServiceDepartments;