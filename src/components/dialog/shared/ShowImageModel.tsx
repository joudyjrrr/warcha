import { FC, useState } from "react";

import { BiSolidTrashAlt } from "react-icons/bi";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
const ShowImageModel: FC<{
  asText?: boolean;
  image: { url: string; name: string };
  className?: string;
  key?: string;
}> = ({ className, key, image, asText = false }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        {asText ? (
          <DialogTrigger asChild>
            <Button variant="link">{image.name}</Button>
          </DialogTrigger>
        ) : (
          <DialogTrigger asChild>
            <img
              src={image.url}
              alt={image.name}
              className="w-36 h-16 object-cover cursor-pointer"
            />
          </DialogTrigger>
        )}
        <DialogContent className="flex flex-col items-center justify-center ">
          <img
            src={image.url}
            alt={image.name}
            className="w-full object-cover"
          />
          <div className="flex w-full gap-6">
            <Button
              className="flex-grow"
              variant={"cancel"}
              onClick={() => setOpenModal(false)}
            >
              إغلاق
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ShowImageModel;
