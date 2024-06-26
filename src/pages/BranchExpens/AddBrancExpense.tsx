import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import apiRoutes from "@/api";
import { toast } from "sonner";
import { CurrencyFormData } from "@/types/currency";
import { CurrenciesValidation } from "@/hooks/validation";
import RHFSelect from "@/components/hook-form/RHFSelect";
import { DefaultFromDate } from "@/hooks/use-window";
import { BranchExpensData } from "@/types/branchExpence";

interface DialogContainerProps {
  isOpen: boolean;
  onClose: () => void;
  formValues?: BranchExpensData;
}

const AddBrancExpense: React.FC<DialogContainerProps> = ({
  isOpen,
  onClose,
  formValues,
}) => {
  const methods = useForm<BranchExpensData>({
    defaultValues: {
      date: DefaultFromDate(),
    },
    // resolver: yupResolver(CurrenciesValidation),
  });
  const { data: Brances } = useQuery({
    queryKey: ["get-select"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.branch.index);
      return data.data;
    },
    select: (data) =>
      data.data.map((data: any) => ({
        id: data.id,
        name: data.name,
      })),
  });
  const { data: brnachExpens } = useQuery({
    queryKey: ["get-branch-exp-bu-id", formValues?.id],
    queryFn: async () => {
      const { data } = await axios.get(
        apiRoutes.banchExpens.show(formValues?.id!)
      );
      return data.data;
    },
    enabled: !!formValues?.id,
  });
  console.log(brnachExpens);
  const { handleSubmit, watch, reset, setValue } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(apiRoutes.banchExpens.buttons.add, data);
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        apiRoutes.banchExpens.buttons.update(formValues?.id!),
        data
      );
      return res;
    },
  });
  const queryCliet = useQueryClient();
  const submitHandler = (data: any) => {
    console.log(data);
    if (brnachExpens) {
      Update(data, {
        onSuccess() {
          toast("تمت تعديل النفقة بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-branch-exp"] });
        },
      });
    } else {
      mutate(data, {
        onSuccess() {
          toast("تمت إضافة النفقة بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-branch-exp"] });
        },
      });
    }
  };
    useEffect(() => {
      if (brnachExpens) {
        reset({
          currency: brnachExpens.currency,
          branch_id: brnachExpens.branch_id,
          title: brnachExpens.title,
          description: brnachExpens.description,
          total_price: brnachExpens.total_price,
          date: new Date(brnachExpens.created_at).toISOString().slice(0, 16),
        });
      }
    }, [brnachExpens]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(submitHandler)} methods={methods}>
          <div className="grid grid-cols-2  gap-4">
            <RHFSelect
              label="البرانش"
              name="branch_id"
             options={Brances}
            />
            <RHFTextField name="title" label="العنوان" />
            <RHFTextField name="description" label="الوصف" />
            <RHFTextField name="currency" label="العملة" />
            <RHFTextField name="date" type="datetime-local" label="التاريخ" />
            <RHFTextField name="total_price" label="السعر الاجمالي" />
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
};

export default AddBrancExpense;
