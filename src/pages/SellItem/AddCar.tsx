import apiRoutes from "@/api";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

const AddCar: FC<{
  open: boolean;
  setOpen: (arg: boolean) => void;
}> = ({ open, setOpen }) => {
  const methods = useForm();
  const { handleSubmit, watch, reset, setValue } = methods;
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
  const { data: carType } = useQuery({
    queryKey: ["get-customer"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.carType.index);
      return data.data;
    },
    select: (data) =>
      data.data.map((d: any) => ({
        id: d.id,
        name: d.name,
      })),
  });
  const { data: CarColor } = useQuery({
    queryKey: ["get-customer"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.CarColor.index);
      return data.data;
    },
    select: (data) =>
      data.data.map((d: any) => ({
        id: d.id,
        name: d.name,
      })),
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[60rem]">
        <h1 className="font-ms text-xl text-center">اضافة سيارة</h1>
        <FormProvider onSubmit={handleSubmit(() => {})} methods={methods}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <RHFTextField label="المحافظة" name="Governorate" />
              <RHFSelect name="car" options={Customer} label="اختر زبون" />
              <RHFSelect name="car" options={carType} label="اختر نوع السيارة" />
            </div>
            <div className="flex gap-2">
            <RHFTextField label="كم" name="Governorate" />
            <RHFSelect name="car" options={CarColor} label="اختر لون السيارة" />
            <RHFTextField label="السنة" name="Governorate" />
            </div>
            <div className="flex gap-2">
            <RHFTextField label="كود السيارة" name="Governorate" />
            <RHFTextField label="رقم العداد" name="Governorate" />
            <RHFTextField label="رقم الهيكل" name="Governorate" />
            </div>
            <div className="flex basis-full  gap-4">
            <Button
              type="submit"
              className="rounded-md flex-grow"
            >
             إضافة
            </Button>
            <Button
              type="button"
              variant={"cancel"}
              className="flex-grow"
              onClick={() => setOpen(false)}
            >
              إلغاء
            </Button>
          </div>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddCar;
