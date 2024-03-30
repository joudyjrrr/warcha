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
  dialogKey?: string;
  isOpen: boolean;
  onClose: () => void;
  formValues?: { name: string };
}

const AddEmployeeType: React.FC<DialogContainerProps> = ({
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
      const res = await axios.post(apiRoutes.employeeType.buttons.add, data);
      return res;
    },
  });
  const queryClient = useQueryClient();
  const submitHandler = (data: any) => {
    mutate(data, {
      onSuccess() {
        toast("تمت إضافة الموظف بنجاح");
        onClose();
        queryClient.refetchQueries({ queryKey: ["get-employee-type"] });
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
          <div className="flex flex-col">
            <RHFTextField name="name" type="text" label="اسم الموظف" />
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

export default AddEmployeeType;
