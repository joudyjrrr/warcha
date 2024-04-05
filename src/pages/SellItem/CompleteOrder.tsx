import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { FC } from "react";

const CompleteOrder: FC<{
  open: boolean;
  setOpen: (arg: boolean) => void;
}> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" text-center max-w-[30rem]">
        <h1 className="font-bold text-lg">ضع الطلب الان</h1>
        <h3 className="text-lg">
          لقد قمت بوضع طلبك الان, هل تريد طباعة الايصال ام لا
        </h3>
        <div className="flex gap-2 w-full">
          <Button className="flex-grow" onClick={() => setOpen(false)}>طباعة</Button>
          <Button
            onClick={() => setOpen(false)}
            className="bg-white flex-grow text-primary border border-primary hover:text-white"
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteOrder;
