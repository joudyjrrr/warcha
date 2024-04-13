import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC } from "react";
import { TableColumn } from "react-data-table-component";
import { FaEye } from "react-icons/fa6";
const data = [
  {
    name: "Hussam Zina",
    id: "1",
    price: "100$",
    type: "دليفري",
  },
  {
    name: "Hussam Zina",
    id: "1",
    price: "100$",
    type: "دليفري",
  },
];
const OrderDetails: FC<{
  open: boolean;
  setOpen: (arg: boolean) => void;
}> = ({ open, setOpen }) => {
  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: "الاسم",
      cell: (row) => <div className="text-base text-black">{row.name}</div>,
    },
    {
      id: "price",
      name: "الخصم",
      cell: (row) => <div className="text-base text-black">{row.price}</div>,
    },
    {
      id: "price",
      name: "نوع الطلب",
      cell: (row) => <div className="text-base text-black">{row.type}</div>,
    },

    {
      id: "price",
      name: "السعر",
      cell: (row) => <div className="text-base text-black">{row.price}</div>,
    },
  ];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-center max-w-[54rem]">
        <h1 className="text-xl font-bold">تفاصيل الطلب</h1>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between mb-4">
            <p>
              رقم الطلب : <span className="text-gray-500">12366525</span>
            </p>
            <p>
              التاريخ / الوقت
              <span className="text-gray-500">07 Oct 2023 02:43:05 PM</span>
            </p>
          </div>
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
          <div className="flex justify-between">
            <p>سعر العناصر: 127.00$</p>
            <p>سعر الاضافات: 127.00$</p>
            <p>ضريبة القيمة المضافة: 127.00$</p>
            <p>المجموع الفرعي: 127.00$</p>
          </div>
          <div className="flex justify-between">
            <p>خصم اضافي: 00</p>
            <p>خصم الكوبون: 127.00$</p>
            <p>رسوم التوصيل: 5.00$</p>
            <h1 className="font-bold text-xl">الاجمالي: 127.00$</h1>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
