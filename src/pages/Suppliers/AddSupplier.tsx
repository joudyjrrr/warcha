import React, { useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import apiRoutes from "@/api";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { PerTypeValidation } from "@/hooks/validation";

interface DialogContainerProps {
  isOpen: boolean;
  onClose: () => void;
  formValues?: { name: string };
}

const AddSupplier: React.FC<DialogContainerProps> = ({
  isOpen,
  onClose,
  formValues,
}) => {
  const methods = useForm({
    resolver: yupResolver(PerTypeValidation),
  });
  const { handleSubmit, reset } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(apiRoutes.supplier.buttons.add, data);
      return res;
    },
  });
  const queryClient = useQueryClient();
  const submitHandler = (data: any) => {
    mutate(data, {
      onSuccess() {
        toast("تمت إضافة المزود بنجاح");
        onClose();
        queryClient.refetchQueries({ queryKey: ["get-suppliers"] });
      },
    });
  };
  useEffect(() => {
    if (formValues) {
      reset({
        name: formValues.name,
      });
    }
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
          <div className="grid grid-cols-2 gap-4">
            <RHFTextField name="name" type="text" label="اسم المزود" />
            <RHFTextField name="phone" type="text" label="رقم التليفون" />
            <RHFTextField name="address" type="text" label="العنوان" />
            <RHFTextField
              name="opening_balance"
              type="number"
              label="الرصيد الافتتاحي"
              
            />
            <RHFTextField
              name="currency"
              type="text"
              label="العملة"
            />
          </div>
          <div className="mt-6 flex gap-4">
            <Button
              disabled={isPending}
              type="submit"
              className="rounded-md flex-grow"
            >
              {isPending ? "الرجاء الانتظار" : "إضافة"}
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

export default AddSupplier;
