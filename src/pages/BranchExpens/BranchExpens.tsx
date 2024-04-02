import apiRoutes from "@/api";
import axios from "@/lib/axios";
import { ModalStates } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AddBrancExpense from "./AddBrancExpense";
import { PageContainer } from "@/components/containers";
import { FaPlus } from "react-icons/fa6";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFSelect from "@/components/hook-form/RHFSelect";
import { useForm } from "react-hook-form";
import { TableColumn } from "react-data-table-component";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { BranchExpensData } from "@/types/branchExpence";
import DeleteModal from "@/components/DeleteModel";
import { Button } from "@/components/ui/button";

const BranchExpens = () => {
  const methods = useForm();
  const { watch } = methods;
  const currentBranch = watch("branch_id");
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-branch-exp", currentBranch],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.banchExpens.index, {
        params: { currentBranch },
      });
      return data.data;
    },
  });
  const { data: Brances } = useQuery({
    queryKey: ["get-select"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.branch.index);
      return data.data;
    },
    select: (data) =>
      data.data.map((data: any) => ({
        id: data.id,
        name: data.name,
      })),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState<BranchExpensData>();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const [modalState, setModalState] = useState<ModalStates>(null);
  const cols: TableColumn<BranchExpensData>[] = [
    {
      id: "title",
      name: "العنوان",
      cell: (row) => <div title={row.currency}>{row.title}</div>,
    },
    {
      id: "description",
      name: "الوصف",
      cell: (row) => <div>{row.description}</div>,
    },
    {
      id: "total_price",
      name: "السعر الاجمالي",
      cell: (row) => <div>{row.total_price}</div>,
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
            apiPath={apiRoutes.banchExpens.buttons.delete(row.id!)}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <PageContainer
        breadcrumb={[{ title: " نفقات الفروع" }]}
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
        filterComponent={
          <FormProvider onSubmit={() => {}} methods={methods}>
            <div className="w-[20rem]">
              <RHFSelect
                placeholder="اختر برانش"
                label="البرانش"
                name="branch_id"
                options={Brances}
              />
            </div>
          </FormProvider>
        }
        addFunction={{
          click() {
            setModalState("add");
          },
          children: (
            <>
              <FaPlus className="text-white text-md" />
              <p>إضافة نفقات الفروع</p>
            </>
          ),
        }}
      />
      {(modalState === "add" || modalState === "edit") && (
        <AddBrancExpense
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
    </>
  );
};

export default BranchExpens;
