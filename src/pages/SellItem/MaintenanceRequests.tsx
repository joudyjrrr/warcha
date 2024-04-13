import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Logo } from "@/assets/svgs";
import { SlArrowDown } from "react-icons/sl";
import { PageContainer } from "@/components/containers";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";
import { DeleteModal } from "@/components/dialog";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { IoIosSearch } from "react-icons/io";
import { useForm } from "react-hook-form";
import MaintenanceRequestsDetaile from "./MaintenanceRequestsDetaile";
const data = [
  {
    name: "kia",
    img: Logo,
    phone: "(+96) 856-0124-265",
    desc1: "ervgrvvsv",
    desc2: "done",
  },
  {
    name: "kia",
    img: Logo,
    phone: "(+96) 856-0124-265",
    desc1: "ervgrvvsv",
    desc2: "test",
  },
];

const MaintenanceRequests = () => {
  const [open, setOpen] = useState<boolean>(false);
  const methods = useForm();
  const { watch } = methods;
  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: "اسم الزبون",
      cell: (row) => (
        <div className="text-base text-black flex gap-2 items-center">
          <Logo width={60} />
          {row.name}
        </div>
      ),
    },

    {
      id: "price",
      name: "رقم التلفون",
      cell: (row) => <div className="text-base text-black">{row.phone}</div>,
    },
    {
      id: "price",
      name: "الوصف",
      cell: (row) => <div className="text-base text-black">{row.desc1}</div>,
    },
    {
      id: "price",
      name: "الوصف",
      cell: (row) => (
        <div
          className={`${
            row.desc2 === "done"
              ? "bg-[#28C76F29] text-[#28C76F]"
              : "bg-[#0FB7FF29] text-[#0FB7FF]"
          } p-2 rounded-lg shadow-sm text-sm flex items-center gap-2`}
        >
          {row.desc2 === "done" ? "تم الفحص" : "تم الاستقبال"}
          <SlArrowDown
            size={10}
            className={`${
              row.desc2 === "done" ? " text-[#28C76F]" : " text-[#0FB7FF]"
            } mt-2 `}
          />
        </div>
      ),
    },
    {
      id: "actions",
      name: "التحكم",
      cell: (row) => (
        <div className="flex justify-center gap-2    items-center text-center cursor-pointer">
          <FiEdit className="text-gray-400 text-lg hover:text-pretty" />
          <BiSolidTrashAlt
            className={`text-gray-400 text-lg hover:text-pretty`}
          />
          <FaEye
            onClick={() => setOpen(true)}
            className="text-gray-400 text-lg "
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <PageContainer
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
        breadcrumb={[{ title: "طلبات الصيانة" }]}
        table={{
          columns: cols,
          data: data,
        }}
      ></PageContainer>
      <MaintenanceRequestsDetaile open={open} setOpen={setOpen} />
    </>
  );
};

export default MaintenanceRequests;
