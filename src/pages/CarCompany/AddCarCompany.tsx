import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import apiRoutes from "@/api";
import { toast } from "sonner";
import { CurrencyFormData } from "@/types/currency";
import { CurrenciesValidation } from "@/hooks/validation";
import RHFInputFile from "@/components/hook-form/RHFInputFile";
import RHFSwitch from "@/components/hook-form/RHFSwitch";
import { CarCompanyData, CarCompanyform } from "@/types/carCompany";

interface DialogContainerProps {
  dialogKey?: string;
  isOpen: boolean;
  onClose: () => void;
  formValues?: CarCompanyData;
}

const AddCarCompany: React.FC<DialogContainerProps> = ({
  isOpen,
  onClose,
  formValues,
}) => {
  const methods = useForm<CarCompanyform>({
    // resolver: yupResolver(CurrenciesValidation),
  });
  const { handleSubmit, watch, reset } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(apiRoutes.carCompany.buttons.add, data, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        apiRoutes.carCompany.buttons.update(formValues?.id!),
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
  const queryCliet = useQueryClient();
  const submitHandler = (data: any) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("name", data.name),
      formData.append("country", data.country);
    formData.append("image", data.image);
    if (formValues) {
      Update(formData, {
        onSuccess() {
          toast("تمت تعديل الشركة بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-car-company"] });
        },
      });
    } else {
      mutate(formData, {
        onSuccess() {
          toast("تمت إضافة الشركة بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-car-company"] });
        },
      });
    }
  };
  useEffect(() => {
    if (formValues) {
      reset({
        country: formValues.country,
        name: formValues.name,
      });
    }
  }, []);
  const currentImg = watch("image");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
          <div className="flex flex-col gap-4">
            <RHFTextField name="name" label="الاسم" />
            <RHFTextField name="country" label="البلد" />
            <RHFInputFile name="image" label="الصورة" />
          </div>
          {formValues && !currentImg && (
            <img
              className="w-[3rem] h-[3rem] mx-auto"
              src={`${BASE_URL_IMG}/${formValues.image?.id}/${formValues.image?.file_name}`}
            />
          )}

          <div className="mt-6 flex basis-full  gap-4">
            <Button
              disabled={isPending}
              type="submit"
              className="rounded-md flex-grow"
            >
              {isPending ? "الرجاء الانتظار" : "إضافة"}
            </Button>
            <Button
              type="button"
              variant={"cancel"}
              className="flex-grow"
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

export default AddCarCompany;
