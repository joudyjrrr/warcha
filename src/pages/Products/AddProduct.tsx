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
import { useEffect } from "react";
import { ProductFormValues } from "@/types";

const AddProductCategory = () => {
  const methods = useForm<ProductFormValues>({
    // resolver: yupResolver(PerTypeValidation),
  });
  const { handleSubmit, reset } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(apiRoutes.product.buttons.add, data);
      return res;
    },
  });
  const queryClient = useQueryClient();
  const submitHandler = (data: any) => {
    mutate(data, {
      onSuccess() {
        toast("تمت إضافة المنتج بنجاح");
        queryClient.refetchQueries({ queryKey: ["get-products"] });
      },
    });
  };
  useEffect(() => {
    reset({
      name: "",
    });
  }, []);
  return (
    <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
      <div className="flex flex-col">
        <RHFTextField name="name" type="text" label="الاسم" />
      </div>
      <div className="mt-6 flex gap-4">
        <Button
          disabled={isPending}
          type="submit"
          className="rounded-md flex-grow"
        >
          {isPending ? "الرجاء الانتظار" : "إضافة"}
        </Button>
      </div>
    </FormProvider>
  );
};

export default AddProductCategory;
