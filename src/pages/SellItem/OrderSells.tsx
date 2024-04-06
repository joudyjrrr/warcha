import apiRoutes from "@/api";
import { PageContainer } from "@/components/containers";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { DefaultFromDate } from "@/hooks/use-window";
import axios from "@/lib/axios";
import { SellItemData } from "@/types/sellItem";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { MdLocalPrintshop } from "react-icons/md";
const OrderSells = () => {
  const methods = useForm({
    defaultValues: {
      date: DefaultFromDate(),
      branch_id: "",
    },
  });
  const { watch } = methods;
  const DateTime = watch("date");
  const Branch = watch("branch_id");
  const { data } = useQuery({
    queryKey: ["get-sell-item", DateTime, Branch],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.sellItem.index, {
        params: { DateTime, Branch },
      });
      return data.data;
    },
  });
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
  const cols: TableColumn<SellItemData>[] = [
    {
      id: "id",
      name: "رقم الطلب",
      cell: (row) => <div>{row.id}</div>,
    },
    {
      id: "branch.name",
      name: "الفرع",
      cell: (row) => <div>{row.branch.name}</div>,
    },
    {
      id: "branch.name",
      name: "التاريخ/الوقت",
      cell: (row) => <div>{moment(row.created_at).format("DD-MM-YYYY")}</div>,
    },
    {
      id: "",
      name: "نوع الطلب",
      cell: (row) => <div></div>,
    },
    {
      id: "status",
      name: "الحالة",
      cell: (row) => (
        <div
          className={`flex items-center p-2 rounded-[4px] text-[16px] font-sm ${
            row.status === "approved"
              ? "text-[#2CC56F] bg-[#E6F6E9]"
              : "text-[#FF9900] bg-[#FFF3EA]"
          }`}
        >
          {row.status}
        </div>
      ),
    },
    {
      id: "status",
      name: "حالة الدفع",
      cell: (row) => <div></div>,
    },
    {
      id: "status",
      name: "المبلغ",
      cell: (row) => <div>{row.total_price}</div>,
    },
    {
      id: "status",
      name: "الاعدادات",
      cell: (row) => <div className="flex gap-2">
        <div className="rounded-lg p-2 cursor-pointer border border-[#1D1F1F]">
          <MdLocalPrintshop className="w-4 h-4"/>
        </div>
        <div className="rounded-lg p-2  cursor-pointer  border border-[#969AA0]">
          <FaEye className="w-4 h-4"/>
        </div>
      </div>,
    },
  ];
  return (
    <PageContainer
      filterComponent={
        <FormProvider onSubmit={() => {}} methods={methods}>
          <div className="flex w-[40rem] items-center gap-4">
            <RHFTextField
              type="datetime-local"
              name="date"
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
      }
      breadcrumb={[{ title: "طلبات المبيعات" }]}
      table={{
        columns: cols,
        data: data?.data ?? [],
      }}
    ></PageContainer>
  );
};

export default OrderSells;
