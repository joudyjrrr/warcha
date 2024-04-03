import React, { useEffect } from "react";
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
import { CarModelData } from "@/types/carModel";
import { CarTypeDate } from "@/types/carType";
import RHFInputFile from "@/components/hook-form/RHFInputFile";

interface DialogContainerProps {
  isOpen: boolean;
  onClose: () => void;
  formValues?: CarTypeDate;
}

const AddCarTypes: React.FC<DialogContainerProps> = ({
  isOpen,
  onClose,
  formValues,
}) => {
  const methods = useForm<CarTypeDate>({
    // resolver: yupResolver(CarModelTypeValidation),
  });
  const { handleSubmit, reset } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(apiRoutes.carType.buttons.add, data , {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data: CarModelData) => {
      const res = await axios.post(
        apiRoutes.carType.buttons.update(formValues?.id!),
        data
      );
      return res;
    },
  });
  console.log(formValues);
  const queryCliet = useQueryClient();
  const submitHandler = (data: any) => {
    const formData = new FormData() as any
    formData.append("fuel",data.fuel)
    formData.append("gear",data.gear)
    formData.append("image",data.image)


    if (formValues?.id) {
      Update(data, {
        onSuccess() {
          toast("تمت تعديل النوع بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-car-type"] });
        },
      });
    } else {
      mutate(formData, {
        onSuccess() {
          toast("تمت إضافة النوع بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-car-type"] });
        },
      });
    }
  };
  useEffect(() => {
    if (formValues) {
      reset({
        gear: formValues.gear,
        fuel: formValues.fuel,
      });
    }
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[35rem]">
        <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
          <div className="flex gap-6">
            <div>
            <div className="flex flex-col justify-center items-center">
              {/* {formValues && !currentImg && (
                <img
                  className="w-40 h-28 mt-6 rounded-xl object-cover"
                  src={`${BASE_URL_IMG}/${formValues.image?.id}/${formValues.image?.file_name}`}
                />
              )} */}
              <RHFInputFile name="image" />
            </div>
            </div>
           <div className="flex flex-col">
           <RHFTextField name="gear" type="text" label="المعدات" />
            <RHFTextField name="fuel" type="text" label="الوقود" />
           </div>
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

export default AddCarTypes;
