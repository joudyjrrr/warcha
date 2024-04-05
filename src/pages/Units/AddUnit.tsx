import React, { useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import apiRoutes from "@/api";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { PerTypeValidation } from "@/hooks/validation";
import { SupplierForm } from "@/types/supplier";
import { UnitFormValues } from "@/types/unit";
import RHFSelect from "@/components/hook-form/RHFSelect";

interface DialogContainerProps {
  isOpen: boolean;
  onClose: () => void;
  formValues?: UnitFormValues;
}

const AddUnit: React.FC<DialogContainerProps> = ({
  isOpen,
  onClose,
  formValues,
}) => {
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
  const methods = useForm<UnitFormValues>({
    // resolver: yupResolver(PerTypeValidation),
  });
  const { handleSubmit, reset } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(apiRoutes.units.buttons.add, data);
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        apiRoutes.units.buttons.update(formValues!.id!),
        data
      );
      return res;
    },
  });
  const queryClient = useQueryClient();
  const submitHandler = (data: any) => {
    if (formValues?.id) {
      Update(data, {
        onSuccess() {
          toast("تمت تعديل الوحدة بنجاح");
          onClose();
          queryClient.refetchQueries({ queryKey: ["get-units"] });
        },
      });
    } else {
      mutate(data, {
        onSuccess() {
          toast("تمت إضافة الوحدة بنجاح");
          onClose();
          queryClient.refetchQueries({ queryKey: ["get-units"] });
        },
      });
    }
  };
  useEffect(() => {
    if (formValues) {
      reset({
        name: formValues.name,
        price: formValues.price,
        currency: formValues.currency,
        price_discount: formValues.price_discount,
        multiple_price: formValues.multiple_price,
        min_multiple_count: formValues.min_multiple_count,
        multiple_price_discount: formValues.multiple_price_discount,
        bar_code: formValues.bar_code,
        product_id: formValues.id,
        work_shop_id: formValues.work_shop_id,
      });
    }
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
          <div className="grid grid-cols-2 gap-4">
            <RHFTextField name="name" type="text" label="اسم الوحدة" />
            <RHFTextField name="price" type="number" label="سعر الوحدة" />
            <RHFTextField name="currency" type="text" label="العملة" />
            <RHFTextField
              name="price_discount"
              type="number"
              label="مقدار الحسم"
            />
            <RHFTextField
              name="multiple_price_discount"
              type="number"
              label="حسم لبيع الجملة"
            />
            <RHFTextField
              name="min_multiple_count"
              type="number"
              label="شرط حسم الجملة"
            />
            <RHFSelect
              label="work shop"
              name="work_shop_id"
              options={workShops}
            />
            <RHFSelect label="المنتج" name="product_id" options={products} />
            <RHFTextField name="bar_code" type="text" label="bar code" />
          </div>
          <div className="mt-6 flex gap-4">
            <Button
              disabled={isPending}
              type="submit"
              className="rounded-md flex-grow"
            >
              {isPending ? "الرجاء الانتظار" : "حفظ"}
            </Button>
            <Button
              type="button"
              className="flex-grow"
              variant={"cancel"}
              onClick={() => onClose()}
            >
              إلغاء
            </Button>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddUnit;
