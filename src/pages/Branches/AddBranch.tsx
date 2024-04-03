import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { FormProvider } from "@/components/hook-form/FormProvider";
import { BranchExpensData } from "@/types/branchExpence";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import apiRoutes from "@/api";
import axios from "@/lib/axios";
import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SelectLocation from "./SelectLocation";
import { BrnacheForm, BrnachesData } from "@/types/branches";
interface DialogContainerProps {
  isOpen: boolean;
  onClose: () => void;
  formValues?: BrnachesData;
}
function AddBranch({ isOpen, onClose, formValues }: DialogContainerProps) {
  const { data: Admin } = useQuery({
    queryKey: ["get-branch-admin"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.branch.getAdmin);
      return data;
    },
    select: (data) =>
      data.data.map((d: any) => ({
        id: d.admin_id,
        name: d.get_admin.email,
      })),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(apiRoutes.branch.buttons.add, data);
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        apiRoutes.branch.buttons.update(formValues?.id!),
        data
      );
      return res;
    },
  });
  const queryCliet = useQueryClient();
  const methods = useForm<BrnacheForm>();
  const { handleSubmit, watch, reset, setValue } = methods;
  const submitHandler = (data: any) => {
    console.log(data);
    if (formValues) {
      Update(data, {
        onSuccess() {
          toast("تمت تعديل الفرع بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-branch"] });
        },
      });
    } else {
      mutate(data, {
        onSuccess() {
          toast("تمت إضافة الفرع بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-branch"] });
        },
      });
    }
  };
  useEffect(() => {
    if (formValues) {
      reset({
        name: formValues.name,
        admin_id: formValues.admin_id,
        city: formValues.city,
        address: formValues.address,
        phone: formValues.phone,
        branch_balance: formValues.branch_balance,
        latitude: formValues.location.latitude,
        longitude: formValues.location.latitude,
      });
    }
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
          <div className="grid grid-cols-2 gap-6">
            <RHFSelect name="admin_id" options={Admin} label="مدير الفرع" />
            <RHFTextField name="name" label="الاسم" />
            <RHFTextField name="phone" label="رقم التليفون" />
            <RHFTextField
              name="branch_balance"
              type="number"
              label="رصيد الفرع"
            />
            <RHFTextField name="address" label="العنوان" />
            <RHFTextField name="city" label="المدينة" />
            <RHFTextField name="email" label="الايميل" />
            {!watch("latitude") && !watch("longitude") ? (
              <SelectLocation setValue={setValue} />
            ) : (
              <>
                <RHFTextField name="latitude" label="خط العرض" />
                <RHFTextField name="longitude" label="حط الطول" />
              </>
            )}
          </div>
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
}

export default AddBranch;
