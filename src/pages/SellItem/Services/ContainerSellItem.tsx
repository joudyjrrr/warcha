import apiRoutes from "@/api";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFRadioGroup from "@/components/hook-form/RHFRadioGroup";
import RHFSelect from "@/components/hook-form/RHFSelect";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import orderImg from "../../../assets/svgs/image 56.svg";
import delvrryImg from "../../../assets/svgs/image 56(1).svg";
import DeliveryInfo from "../DeliveryInfo";
import { Button } from "@/components/ui/button";
import CouponCode from "../CouponCode";
import CompleteOrder from "../CompleteOrder";
import { ServiceData } from "@/types/serviceDepartment";
import { TableColumn } from "react-data-table-component";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { BiSolidTrashAlt } from "react-icons/bi";
import { Table } from "@/components/ui/Layout";

const ContainerSellItem:FC<{
    selectedService: ServiceData[];
    setSelectedService: (arg: ServiceData[]) => void;
}> = ({
    selectedService,
    setSelectedService,
}) => {
    const [totalPrice, setTotalPrice] = useState(selectedService[0]?.price);

    const [openComplete, setOpenComplete] = useState(false);
    const [selectedCode, setSelectedCode] = useState<any>(null); // حالة المتغير المحدد

  const [openDelvery, setOpenDelevry] = useState(false);
  const [openCouponCode, setOpenCouponCode] = useState(false);

  const methods = useForm();

  const { handleSubmit } = methods;
  const { data: Customer } = useQuery({
    queryKey: ["get-customer"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.customer.index);
      return data.data;
    },
    select: (data) =>
      data.data.map((d: any) => ({
        id: d.customer_id,
        name: d.name,
      })),
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
  const { data: Currency } = useQuery({
    queryKey: ["get-currency"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.currency.index);
      return data.data;
    },
    select: (data) =>
      data.data.map((d: any) => ({
        id: d.id,
        name: d.currency,
      })),
  });
  const { data: Paytypes } = useQuery({
    queryKey: ["get-payTypes"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.payType.index);
      return data;
    },
    select: (data) =>
      data.data.map((d: any) => ({
        id: d.id,
        name: d.name,
      })),
  });
  const handleQuantityChangeServie = (product: ServiceData, action: any) => {
    const updatedProducts = [...selectedService];
    const selectedProductIndex = updatedProducts.findIndex(
      (p) => p.id === product.id
    );

    if (action === "increase") {
      updatedProducts[selectedProductIndex].quantity += 1;
    } else if (action === "decrease") {
      if (updatedProducts[selectedProductIndex].quantity > 0) {
        updatedProducts[selectedProductIndex].quantity -= 1;
      }
    } else {
      updatedProducts[selectedProductIndex].quantity = action;
    }

    setSelectedService(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };
  const calculateTotalPrice = (products: ServiceData[]) => {
    const totalPrice = products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    setTotalPrice(totalPrice);
  };
  const handleServiceDelete = (product: ServiceData) => {
    const updatedProducts = selectedService.filter((p) => p.id !== product.id);
    setSelectedService(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };
  const colsService: TableColumn<ServiceData>[] = [
    {
      id: "name",
      name: "الاسم",
      cell: (row) => <div className="text-sm">{row.name}</div>,
    },
    {
      id: "price",
      name: "السعر",
      cell: (row) => <div>{row.price}</div>,
    },
    {
      id: "quantity",
      name: "الكمية",
      cell: (row) => (
        <div className="flex gap-2 items-center">
          <Button
            variant={"link"}
            onClick={() => handleQuantityChangeServie(row, "decrease")}
          >
            <CiCircleMinus className="text-primary text-2xl" />
          </Button>
          <Input
            className="p-2 w-10 h-10"
            value={row.quantity}
            min={0}
            onChange={(e) =>
              handleQuantityChangeServie(row, parseInt(e.target.value) as any)
            }
          />
          <Button
            variant={"link"}
            onClick={() => handleQuantityChangeServie(row, "increase")}
          >
            <CiCirclePlus className="text-primary text-2xl" />
          </Button>
        </div>
      ),
    },
    {
      id: "price",
      name: "السعر",
      cell: (row) => (
        <Button onClick={() => handleServiceDelete(row)} variant={"link"}>
          <BiSolidTrashAlt
            className={`text-destructive text-lg hover:text-pretty`}
          />
        </Button>
      ),
    },
  ];
  return (
    <div className="p-4 bg-white rounded-xl transition-all drop-shadow-lg flex flex-col gap-4 w-[430px]">
      <FormProvider onSubmit={handleSubmit(() => {})} methods={methods}>
        <div className="flex flex-col gap-2">
          <RHFSelect
            name="inormation[customer_id]"
            options={Customer}
            label="اختر زبون"
          />
          <RHFRadioGroup
            onChange={(value) => value == "delivery" && setOpenDelevry(true)}
            label="نوع الطلبية"
            withoutIcon
            name="order_typr"
            options={[
              { id: "store", name: "Store", icon: <img src={orderImg} /> },
              {
                id: "delivery",
                name: "Delivery",
                icon: <img src={delvrryImg} />,
              },
            ]}
          />
            {selectedService.length > 0 && (
            <div className="flex flex-col pb-2 border-b border-black">
              <h1 className="text-xl font-md">الخدمات</h1>
              <Table
                width="420px"
                table={{
                  columns: colsService,
                  data: selectedService,
                }}
              />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span>price items: 127.00$</span>
                  <span>Coupon discount: 127.00$</span>
                </div>
                <div className="flex flex-col">
                  <span>tax: 127.00$</span>
                  <span>Additional discount: 00</span>
                </div>
              </div>
              <h1 className="font-md text-lg"> Total: {totalPrice}$</h1>
            </div>
          )}
          <RHFSelect name="branch_id" options={Branches} label="اختر فرع" />
          <Button
            className="bg-white border border-primary text-primary font-md text-lg hover:text-white"
            onClick={() => setOpenCouponCode(true)}
          >
            اضافة كوبون
          </Button>
          <h1 className="font-md text-lg"> Total: 127$</h1>
          <RHFSelect
            name="information[pay_type_id]"
            options={Paytypes}
            label="اختر طريقة دفع"
          />
          <RHFSelect
            name="information[Currency]"
            options={Currency}
            label="اختر عملة"
          />
              <div className="mt-6 flex basis-full  gap-4">
            <Button
              
              type="submit"
              className="rounded-md flex-grow"
              onClick={() => setOpenComplete(true)}
            >
             اكمال الطلب
            </Button>
          </div>
        </div>
      </FormProvider>
      <DeliveryInfo setOpen={setOpenDelevry} open={openDelvery} />
      <CouponCode
        selectedRow={selectedCode}
        setSelectedRow={setSelectedCode}
        open={openCouponCode}
        setOpen={setOpenCouponCode}
      />
      <CompleteOrder open={openComplete} setOpen={setOpenComplete} />
    </div>
  );
};

export default ContainerSellItem;
