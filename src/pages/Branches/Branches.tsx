import apiRoutes from "@/api";
import { PageContainer } from "@/components/containers";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import axios from "@/lib/axios";
import { IoIosSearch } from "react-icons/io";
import { ModalStates } from "@/types";
import { BrnachesData } from "@/types/branches";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DeleteModal from "@/components/DeleteModel";
import { FaPlus } from "react-icons/fa6";
import AddBranch from "./AddBranch";

const Branches = () => {
  const [selectedRow, setSelectedRow] = useState<BrnachesData>();
  const [modalState, setModalState] = useState<ModalStates>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const methods = useForm();
  const { watch } = methods;
  const name = watch("name");
  const { data, isFetching, error } = useQuery({
    queryKey: ["get-branch", name],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.branch.index, {
        params: { name },
      });
      return data.data;
    },
  });

  const cols: TableColumn<BrnachesData>[] = [
    {
      id: "name",
      name: "اسم البرانش",
      cell: (row) => <div title={row.name}>{row.name}</div>,
    },
    {
      id: "branch_balance",
      name: "رصيد البرانش",
      cell: (row) => <div>{row.branch_balance}</div>,
    },
    {
      id: "city",
      name: "المدينة",
      cell: (row) => <div>{row.city}</div>,
    },
    {
      id: "city",
      name: "العنوان",
      cell: (row) => <div>{row.address}</div>,
    },
    {
      id: "phone",
      name: "رقم التليفون",
      cell: (row) => <div>{row.phone}</div>,
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
          apiPath={apiRoutes.branch.buttons.delete(row.id!)}
          refetch={() => {}}
        />
      </div>
      ),
    },
  ];
  return (
  <>
  <PageContainer
      breadcrumb={[{ title: " إدارة الفروع" }]}
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
            <RHFTextField
              startAdornment={
                <IoIosSearch className="text-gray-600 text-2xl" />
              }
              name="name"
              placeholder="البحث حسب الاسم"
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
            <p>إضافة  الفروع</p>
          </>
        ),
      }}
    />
     {(modalState === "add" || modalState === "edit") && (
        <AddBranch
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
  </>
  );
};

export default Branches;
