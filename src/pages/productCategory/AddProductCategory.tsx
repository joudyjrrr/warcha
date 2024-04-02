import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import apiRoutes from "@/api";
import { toast } from "sonner";
import { CurrencyFormData } from "@/types/currency";
import { yupResolver } from "@hookform/resolvers/yup";
import { PerTypeValidation } from "@/hooks/validation";
import RHFInputFile from "@/components/hook-form/RHFInputFile";
import {
  ProductCategoryData,
  ProductCategoryForm,
} from "@/types/productCategory";

interface DialogContainerProps {
  dialogKey?: string;
  isOpen: boolean;
  onClose: () => void;
  formValues?: ProductCategoryData;
}

const AddProductCategory: React.FC<DialogContainerProps> = ({
  isOpen,
  onClose,
  formValues,
}) => {
  const methods = useForm<ProductCategoryForm>({
    resolver: yupResolver(PerTypeValidation),
  });
  const { handleSubmit, reset, watch } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        apiRoutes.productCategory.buttons.add,
        data,
        {
          headers: {
            "Content-Type": "multipart/formData",
          },
        }
      );
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        apiRoutes.productCategory.buttons.update(formValues?.id!),
        data,
        {
          headers: {
            "Content-Type": "multipart/formData",
          },
        }
      );
      return res;
    },
  });
  const queryClient = useQueryClient();
  const submitHandler = (data: any) => {
    const formData = new FormData() as any;
    formData.append("name", data.name);
    formData.append("image", data.image);
    if (formValues?.id) {
      Update(formData, {
        onSuccess() {
          toast("تمت تعديل نوع المنتج بنجاح");
          onClose();
          queryClient.refetchQueries({ queryKey: ["get-prod-cat"] });
        },
      });
    } else {
      mutate(formData, {
        onSuccess() {
          toast("تمت إضافة نوع المنتج بنجاح");
          onClose();
          queryClient.refetchQueries({ queryKey: ["get-prod-cat"] });
        },
      });
    }
  };
  useEffect(() => {
    if (formValues) {
      reset({
        name: formValues.name,
      });
    }
  }, []);
  const currentImg = watch("image");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
          <div className="flex flex-col">
            <RHFTextField name="name" type="text" label="الاسم" />
            <RHFInputFile name="image" label="الصورة" />
            {formValues && !currentImg && (
              <img
                className="w-[3rem] h-[3rem] mx-auto"
                src={`${BASE_URL_IMG}/${formValues.image?.id}/${formValues.image?.file_name}`}
              />
            )}
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

export default AddProductCategory;
