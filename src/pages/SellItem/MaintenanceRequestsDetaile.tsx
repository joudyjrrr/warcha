import { Logo } from "@/assets/svgs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { FC } from "react";

const MaintenanceRequestsDetaile: FC<{
  open: boolean;
  setOpen: (arg: boolean) => void;
}> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-4">
        <h1 className="text-start text-xl text-[#3B4758] mb-4">
          تفاصيل طلب الصيانة
        </h1>
        <p className="text-lg">معلومات الطلب</p>
        <div className="flex items-center gap-4">
          <Logo width={80} />
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-md">صيانة سيارة </h1>
            <p className="text-gray-500">رقم المستلم: (+96) 856-0124-265 </p>
          </div>
        </div>
        <div className="bg-[#F1F3F6] p-4 text-[#3B4758] text-base rounded-md">
          <p className="">
            هذا هو طلبي الأول من خلال هذا التطبيق، وأنا راضٍ تمامًا
            <br /> اريد تصليح سيارتي
          </p>
          <p>فيها مشكلة</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceRequestsDetaile;
