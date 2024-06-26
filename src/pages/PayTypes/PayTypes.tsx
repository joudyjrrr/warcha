import { PageContainer } from "@/components/containers";
import { useQuery } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import moment from "moment";
import { ModalStates, PayTypeData } from "@/types";
import "moment/locale/ar";
import { FiEdit } from "react-icons/fi";
import axios from "@/lib/axios";
import apiRoutes from "@/api";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import AddPerType from "./AddPerType";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {DeleteModal} from "@/components/dialog";
const PayTypes = () => {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-payTypes"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.payType.index);
      return data.data;
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState<{
    name: string;
    id: number;
  }>();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [modalState, setModalState] = useState<ModalStates>(null);

  const cols: TableColumn<PayTypeData>[] = [
    {
      id: "name",
      name: "اسم الطريقة ",
      cell: (row) => <div title={row.name}>{row.name}</div>,
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
              <p>إضافة طريقة دفع </p>
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
        breadcrumb={[{ title: "طرق الدفع" }]}
      ></PageContainer>

      {(modalState === "add" || modalState === "edit") && (
        <AddPerType
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
    </>
  );
};

export default PayTypes;
