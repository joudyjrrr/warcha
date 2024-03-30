import React, { useEffect, useState } from "react";
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
import { CarColorData } from "@/types/CarColor";
import { ColorResult, SketchPicker } from "react-color";

interface DialogContainerProps {
  isOpen: boolean;
  onClose: () => void;
  formValues?: CarColorData;
}

const AddCarColor: React.FC<DialogContainerProps> = ({
  isOpen,
  onClose,
  formValues,
}) => {
  const methods = useForm<CarColorData>({
    // resolver: yupResolver(CarModelTypeValidation),
  });
  const [OpenColorPicker, setOpenColorPicker] = useState<boolean>(false);
  const [blockPickerColor, setBlockPickerColor] = useState<string>("#ff0000");
  const { handleSubmit, reset, watch } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(apiRoutes.CarColor.buttons.add, data);
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(
        apiRoutes.CarColor.buttons.update +
          `/${formValues?.id}?${data.color}&${blockPickerColor}`
      );
      return res;
    },
  });
  const queryCliet = useQueryClient();
  const submitHandler = (data: CarColorData) => {
    if (formValues?.id) {
      Update(
        {
          code: blockPickerColor,
          color: data.color,
        },
        {
          onSuccess() {
            toast("تمت تعديل اللون بنجاح");
            onClose();
            queryCliet.refetchQueries({ queryKey: ["get-car-color"] });
          },
        }
      );
    } else {
      mutate(
        {
          code: blockPickerColor,
          color: data.color,
        },
        {
          onSuccess() {
            toast("تمت إضافة اللون بنجاح");
            onClose();
            queryCliet.refetchQueries({ queryKey: ["get-car-color"] });
          },
        }
      );
    }
  };
  useEffect(() => {
    if (formValues) {
      reset({
        color: formValues.color,
      });
      setBlockPickerColor(formValues.code);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
          <div className="flex gap-4 flex-col">
            <RHFTextField name="color" type="text" label="الاسم" />
            <div className="flex justify-center">
              <div
                onClick={() => setOpenColorPicker(true)}
                className="w-[40px] h-[40px] rounded-md"
                style={{
                  background:blockPickerColor
                }}
              ></div>
            </div>
          </div>
          <Dialog open={OpenColorPicker} onOpenChange={setOpenColorPicker}>
            <DialogContent>
              <SketchPicker
                color={blockPickerColor}
                onChange={(color: ColorResult) => {
                  setBlockPickerColor(color.hex);
                  setOpenColorPicker(false);
                }}
              />
            </DialogContent>
          </Dialog>
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

export default AddCarColor;
