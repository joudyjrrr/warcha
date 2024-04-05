import { PageContainer } from "@/components/containers";
import { useQuery } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import moment from "moment";
import { ModalStates } from "@/types";
import "moment/locale/ar";
import axios from "@/lib/axios";
import apiRoutes from "@/api";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { DeleteModal } from "@/components/dialog";
import { UnitData } from "@/types/unit";
import AddUnit from "./AddUnit";
import { CgEye } from "react-icons/cg";

const Unit = () => {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-units"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.units.index);
      return data.data;
    },
  });
  const { data: workShops } = useQuery({
    queryKey: ["get-select-work-shop"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.workShops.search);
      return data.data;
    },
    select: (data) =>
      data.map((data: any) => ({
        id: data.id,
        name: data.name,
      })),
  });
  const { data: products } = useQuery({
    queryKey: ["get-select-product"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.product.index);
      return data.data;
    },
    select: (data) =>
      data.data.map((data: any) => ({
        id: data.id,
        name: data.name,
      })),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [selectedRow, setSelectedRow] = useState<UnitData>();
  const [modalState, setModalState] = useState<ModalStates>(null);

  const cols: TableColumn<UnitData>[] = [
    {
      id: "name",
      name: "اسم المزود",
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
              setSelectedRow(row);
            }}
            asChild
          >
            <Link to={`/settings/units/${row.id}`}>
              <CgEye className="text-primary text-lg hover:text-pretty" />
            </Link>
          </Button>
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
            apiPath={apiRoutes.units.buttons.delete(row.id!)}
            refetch={refetch}
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
            <p>إضافة وحدة</p>
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
      breadcrumb={[{ title: "الوحدات" }]}
    >
      {(modalState === "add" || modalState === "edit") && (
        <AddUnit
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
    </PageContainer>
  );
};

export default Unit;
