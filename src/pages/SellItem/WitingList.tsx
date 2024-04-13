import apiRoutes from "@/api";
import { PageContainer } from "@/components/containers";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DefaultFromDate } from "@/hooks/useHelper";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import OrderDetails from "./OrderDetails";
const data = [
  {
    name: "Hussam Zina",
    id: "1",
    price: "100$",
    date: "17 May 2022",
  },
  {
    name: "Hussam Zina",
    id: "1",
    price: "100$",
    date: "17 May 2022",
  },
];
const WitingList = () => {
  const [open,setOpen] = useState<boolean>(false)
  const { data: Branches } = useQuery({
    queryKey: ["get-branch"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.branch.index);
      return data.data;
    },
    select: (data) =>
      data.data.map((d: any) => ({
        id: d.id,
        name: d.name,
      })),
  });
  const cols: TableColumn<any>[] = [
    {
        id: "price",
        name: "الاعدادات",
        cell: (row) => (
          <div className="text-base text-black flex items-center gap-3">
            <Button className="text-[#FB5607] hover:bg-white border border-[#FB5607] bg-transparent p-2 text-base">
              استكمال الطلب
            </Button>
            <div className="rounded-lg p-2  cursor-pointer  border border-[#969AA0]">
              <FaEye className="w-4 h-4" />
            </div>
          </div>
        ),
      },
   
  
  
    {
      id: "price",
      name: "التاريخ/الوقت",
      cell: (row) => <div className="text-base text-black">{row.date}</div>,
    }, 
    {
        id: "price",
        name: "المبلغ",
        cell: (row) => <div className="text-base text-black">{row.price}</div>,
      },
    {
        id: "name",
        name: "اسم الزبون",
        cell: (row) => <div className="text-base text-black">{row.name}</div>,
      },
      {
        id: "id",
        name: "رقم الطلب",
        cell: (row) => <div onClick={()=>setOpen(true)} className="text-base text-black cursor-pointer">{row.id}</div>,
      },
  ];
  const methods = useForm({
    defaultValues: {
      date: DefaultFromDate(),
      branch_id: "",
    },
  });
  return (
    <PageContainer breadcrumb={[{ title: "قوائم الانتظار" }]}>
        <FormProvider onSubmit={() => {}} methods={methods}>
            <div className="flex w-[40rem] items-center gap-4">
              <RHFTextField
                type="datetime-local"
                name="date"
                className="mt-4"
                placeholder="تاريخ البدء"
                label="تاريخ البدء"
              />
              <RHFSelect
                name="branch_id"
                className="mt-8"
                placeholder="اختر فرع"
                options={Branches}
                label="اختر فرع"
              />
            </div>
          </FormProvider>
      <Tabs
        defaultValue="All"
        className="w-full flex flex-col items-end justify-end"
      >
        <TabsList>
          <TabsTrigger value="market">متجر </TabsTrigger>
          <TabsTrigger value="dev">ديليفري</TabsTrigger>
          <TabsTrigger value="All">الكل</TabsTrigger>
        </TabsList>
        <TabsContent value="All" className="w-full flex flex-col items-end justify-end mt-6">
          
          <Table
            customStyles={{
              headCells: {
                style: {
                  color: "black",
                  fontWeight: "500",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "center",
                  background: "#F2F2F2",
                },
              },
              cells: {
                style: {
                  color: "#1D1F1F",
                  display: "flex",
                  border: "none",
                  justifyContent: "center",
                },
              },
              rows: {
                style: {
                  borderBottom: "none",
                },
              },
            }}
            table={{
              columns: cols,
              data: data,
            }}
          />
        </TabsContent>
      </Tabs>
      <OrderDetails open={open} setOpen={setOpen}/>
    </PageContainer>
  );
};

export default WitingList;
