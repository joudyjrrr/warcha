import { FC, useState } from "react";

import { BiSolidTrashAlt } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Button } from "../../ui/button";
import axios from "@/lib/axios";
const DeleteModal: FC<{
  MassegeSuccess: string;
  refetch?: () => void;
  apiPath?: string;
  className?: string;
  key?: string;
}> = ({ apiPath, MassegeSuccess, refetch }) => {
  const [openModal, setOpenModal] = useState(false);
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(apiPath!);
      return res;
    },
    onSuccess: () => {
      toast(MassegeSuccess);
      setOpenModal(false);
      refetch?.();
    },
    onError: (errorMessage: any) => {
      toast.error(errorMessage);
    },
  });
  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <>
      <BiSolidTrashAlt
        onClick={() => {
          setOpenModal(true);
        }}
        className={`text-destructive text-lg hover:text-pretty`}
      />
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="flex flex-col items-center justify-center ">
          <h1 className="text-lg font-md mb-6">هل تريد بالفعل حذفها ....?</h1>
          <div className="flex w-full gap-6">
            <Button
              className="flex-grow"
              variant={"cancel"}
              onClick={() => setOpenModal(false)}
            >
              إلغاء
            </Button>
            <Button
              className="flex-grow"
              onClick={handleDelete}
              disabled={mutation.isPaused}
            >
              {mutation.isPending ? "الرجاء الانتظار" : "نعم"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default DeleteModal;
