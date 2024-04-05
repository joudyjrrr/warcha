import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductData } from "@/types";
import React, { FC } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const ModalDetails: FC<{
  open: boolean;
  selectedProducts: ProductData[];
  setSelectedProducts: (a: ProductData[]) => void;
  Product: ProductData;
  setSelectedProduc: (a: ProductData) => void;
  setOpen: (arg: boolean) => void;
}> = ({
  open,
  setOpen,
  Product,
  setSelectedProduc,
  selectedProducts,
  setSelectedProducts,
}) => {
  const handleQuantityChange = (action: string) => {
    const updatedProducts = selectedProducts?.map((p) => {
      if (p.id === Product.id) {
        if (action === "increase") {
          return { ...p, quantity: p.quantity + 1 };
        } else if (action === "decrease") {
          if (p.quantity > 0) {
            return { ...p, quantity: p.quantity - 1 };
          }
        }
      }
      return p;
    });
    if (action === "increase") {
      setSelectedProduc({ ...Product, quantity: Product.quantity + 1 });
    } else {
      setSelectedProduc({ ...Product, quantity: Product.quantity - 1 });
    }
    setSelectedProducts(updatedProducts);
  };
  console.log(selectedProducts);

  const handleProductSelect = () => {
    if (selectedProducts.includes(Product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== Product));
    } else {
      setSelectedProducts([...selectedProducts, { ...Product }]);
    }
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h1 className="font-md text-xl text-center">تفاصيل المنتج</h1>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Button
              variant={"link"}
              onClick={() => handleQuantityChange("decrease")}
            >
              <CiCircleMinus className="text-primary text-2xl" />
            </Button>
            <span className="p-2 w-[35px]">
              <span className="p-2 w-[35px]">{Product?.quantity}</span>{" "}
            </span>{" "}
            <Button
              variant={"link"}
              onClick={() => handleQuantityChange("increase")}
            >
              <CiCirclePlus className="text-primary text-2xl" />
            </Button>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col">
              <span>{Product?.name}</span>
              <span>Price:{Product?.price}</span>
              {/* <span>{Product.}</span> */}
            </div>
            <img
              src={`https://warsha.htc-company.com/public/getImage/${Product?.main_image.id}/${Product?.main_image.file_name}`}
              alt={Product?.main_image.file_name}
              className="w-[60px] aspect-square h-[60px]  object-cover"
            />
          </div>
        </div>
        <Button onClick={()=>handleProductSelect()}>اضافة المنتج</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetails;
