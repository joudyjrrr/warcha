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
import { CarModelTypeValidation, PerTypeValidation } from "@/hooks/validation";
import { CarModelData } from "@/types/carModel";

interface DialogContainerProps {
  dialogKey?: string;
  isOpen: boolean;
  onClose: () => void;
  formValues?: CarModelData;
}

const AddCarMode: React.FC<DialogContainerProps> = ({
  isOpen,
  onClose,
  formValues,
}) => {
  const methods = useForm<CarModelData>({
    resolver: yupResolver(CarModelTypeValidation),
  });
  const { handleSubmit, reset } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(apiRoutes.CarMode.buttons.add, data);
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data : CarModelData) => {
      const res = await axios.post(
        apiRoutes.CarMode.buttons.update + `/${formValues?.id}?${data.value}`,
        data
      );
      return res;
    },
  });
  console.log(formValues);
  const queryCliet = useQueryClient();
  const submitHandler = (data: any) => {
    if (formValues?.id) {
      Update(data, {
        onSuccess() {
          toast("تمت تعديل الموديل بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-car-model"] });
        },
      });
    } else {
      mutate(data, {
        onSuccess() {
          toast("تمت إضافة الموديل بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-car-model"] });
        },
      });
    }
  };
  useEffect(() => {
    if (formValues) {
      reset({
        value: formValues.value,
      });
    }
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
          <div className="flex flex-col">
            <RHFTextField name="value" type="text" label="الاسم" />
          </div>
          <div className="mt-6 flex   gap-4">
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

export default AddCarMode;
