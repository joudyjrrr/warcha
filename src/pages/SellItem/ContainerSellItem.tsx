import apiRoutes from "@/api";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFRadioGroup from "@/components/hook-form/RHFRadioGroup";
import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { ProductData } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { FC, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { BiSolidTrashAlt } from "react-icons/bi";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import orderImg from "../../assets/svgs/image 56.svg";
import delvrryImg from "../../assets/svgs/image 56(1).svg";
import DeliveryInfo from "./DeliveryInfo";
import CouponCode from "./CouponCode";
import CompleteOrder from "./CompleteOrder";

const ContainerSellItem: FC<{
  setSelectedProducts: (arg: ProductData[]) => void;
  selectedProducts: ProductData[];
}> = ({ selectedProducts, setSelectedProducts }) => {
  const [totalPrice, setTotalPrice] = useState(selectedProducts[0].price);
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

  const handleQuantityChange = (product: ProductData, action: string) => {
    const updatedProducts = [...selectedProducts];
    const selectedProductIndex = updatedProducts.findIndex(
      (p) => p.id === product.id
    );

    if (action === "increase") {
      updatedProducts[selectedProductIndex].quantity += 1;
    } else if (action === "decrease") {
      if (updatedProducts[selectedProductIndex].quantity > 0) {
        updatedProducts[selectedProductIndex].quantity -= 1;
      }
    }

    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  const handleProductDelete = (product: ProductData) => {
    const updatedProducts = selectedProducts.filter((p) => p.id !== product.id);
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  const calculateTotalPrice = (products: ProductData[]) => {
    const totalPrice = products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    setTotalPrice(totalPrice);
  };
  const cols: TableColumn<ProductData>[] = [
    {
      id: "name",
      name: "الاسم",
      cell: (row) => <div>{row.name}</div>,
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
            onClick={() => handleQuantityChange(row, "decrease")}
          >
            <CiCircleMinus className="text-primary text-2xl" />
          </Button>
          <span className="p-2 w-[35px]">{row.quantity}</span>
          <Button
            variant={"link"}
            onClick={() => handleQuantityChange(row, "increase")}
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
        <Button onClick={() => handleProductDelete(row)} variant={"link"}>
          <BiSolidTrashAlt
            className={`text-destructive text-lg hover:text-pretty`}
          />
        </Button>
      ),
    },
  ];
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(apiRoutes.sellItem.buttons.add, data);
      return res;
    },
  });
  const [selectedCode, setSelectedCode] = useState<any>(null); // حالة المتغير المحدد

  const methods = useForm();
  const { handleSubmit, watch, reset, setValue } = methods;
  const [openComplete, setOpenComplete] = useState(false);
  const [openDelvery, setOpenDelevry] = useState(false);
  const [openCouponCode, setOpenCouponCode] = useState(false);
  const submitHandler = (data: any) => {
    const buy_info = selectedProducts.map((product) => {
      const { id, price, quantity } = product;
      return { id, price, quantity };
    });
    console.log(buy_info);
    const itemInfo = {
      buy_info,
      totalPrice,
      ...data,
    };
    mutate(itemInfo);
  };
  // console.log(selectedCode)
  return (
    <div className="p-4 bg-white rounded-xl transition-all drop-shadow-lg flex flex-col gap-4 w-[470px]">
      <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
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
          <RHFSelect name="branch_id" options={Branches} label="اختر فرع" />
          <Table
            width="420px"
            table={{
              columns: cols,
              data: selectedProducts,
            }}
          />
          <Button
            className="bg-white border border-primary text-primary font-md text-lg hover:text-white"
            onClick={() => setOpenCouponCode(true)}
          >
            اضافة كوبون
          </Button>
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
          <h1 className="font-md text-lg"> Total: {totalPrice}</h1>
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
          {/* <RHFTextField name="information[currency]"/> */}
          <div className="mt-6 flex basis-full  gap-4">
            <Button
              disabled={isPending}
              type="submit"
              className="rounded-md flex-grow"
              onClick={() => setOpenComplete(true)}
            >
              {isPending ? "الرجاء الانتظار" : "اكمال الطلب"}
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
