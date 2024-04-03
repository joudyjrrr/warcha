import React, { useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import apiRoutes from "@/api";
import { toast } from "sonner";
import { CarModelData } from "@/types/carModel";
import { CarTypeDate } from "@/types/carType";
import { CarsData, CarsForm } from "@/types/cars";
import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFInputFile from "@/components/hook-form/RHFInputFile";

interface DialogContainerProps {
  isOpen: boolean;
  onClose: () => void;
  formValues?: CarsData;
}

const AddCars: React.FC<DialogContainerProps> = ({
  isOpen,
  onClose,
  formValues,
}) => {
  const methods = useForm<CarsForm>({
    // resolver: yupResolver(CarModelTypeValidation),
  });
  const { data: CarCompany } = useQuery({
    queryKey: ["get-car-company"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.carCompany.index);
      return data.data;
    },
    select: (data) =>
      data.map((data: any) => ({
        id: data.id,
        name: data.name,
      })),
  });
  const { data: CarTypes } = useQuery({
    queryKey: ["get-car-type"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.carType.index);
      return data.data;
    },
    select: (data) =>
      data.map((data: any) => ({
        id: data.id,
        name: data.gear,
      })),
  });
  const { handleSubmit, reset, watch } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(apiRoutes.cars.buttons.add, data, {
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
        apiRoutes.cars.buttons.update(formValues?.id!),
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
  console.log(formValues);
  const queryCliet = useQueryClient();
  const submitHandler = (data: CarsForm) => {
    const formData = new FormData() as any;
    formData.append("name", data.name);
    formData.append("model", data.model);
    formData.append("motor_cc", data.motor_cc);
    formData.append("horsepower", data.horsepower);
    formData.append("car_type_id", data.car_type_id);
    formData.append("company_id", data.company_id);
    formData.append("image", data.image);
    if (formValues?.id) {
      Update(formData, {
        onSuccess() {
          toast("تمت تعديل السيارة بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-cars"] });
        },
      });
    } else {
      mutate(formData, {
        onSuccess() {
          toast("تمت إضافة السيارة بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-cars"] });
        },
      });
    }
  };
  useEffect(() => {
    if (formValues) {
      reset({
        name: formValues.name,
        model: formValues.model,
        motor_cc: formValues.motor_cc,
        horsepower: formValues.horsepower,
        company_id: formValues.car_company.id,
        car_type_id: formValues.car_type.id,
      });
    }
  }, []);
  const currentImg = watch("image");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[55rem]">
        <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
          <div className="flex  gap-12">
          
            <div className="grid grid-cols-2 gap-6">
              <RHFTextField name="name" type="text" label="الاسم" />
              <RHFSelect
                options={CarCompany}
                name="company_id"
                label="شركة السيارة"
              />
              <RHFTextField name="model" type="text" label="الموديل" />
             
              <RHFSelect
                options={CarTypes}
                name="car_type_id"
                label="نوع السيارة"
              />
              <RHFTextField name="motor_cc" type="number" label="رقم الموتور" />
              <RHFTextField
                name="horsepower"
                type="number"
                label="قوة الحصان"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              {formValues && !currentImg && (
                <img
                  className="w-40 h-28 mt-6 rounded-xl object-cover"
                  src={`${BASE_URL_IMG}/${formValues.image?.id}/${formValues.image?.file_name}`}
                />
              )}
              <RHFInputFile name="image" />
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

export default AddCars;
