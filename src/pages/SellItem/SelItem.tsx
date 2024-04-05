import apiRoutes from "@/api";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ProductData } from "@/types";
import { PageContainer } from "@/components/containers";
import ContainerSellItem from "./ContainerSellItem";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { IoIosSearch } from "react-icons/io";
import { useForm } from "react-hook-form";
import ModalDetails from "./ModalDetails";
function SelItem() {
  const methods = useForm();
  const { watch } = methods;
  const name = watch("name");
  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);
  const [selectedProduc, setSelectedProduc] = useState<ProductData>();
  const [open, setOpen] = useState<boolean>();

  const { data } = useQuery({
    queryKey: ["get-products", name],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.product.index, {
        params: { name },
      });
      return data.data;
    },
  });

  const handleProductSelect = (product: ProductData) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
    setSelectedProduc({ ...product, quantity: 1 });
    setOpen(true);
  };

  return (
    <>
      <PageContainer
        breadcrumb={[{ title: "المبيعات" }]}
        filterComponent={
          <FormProvider onSubmit={() => {}} methods={methods}>
            <div className="w-[20rem]">
              <RHFTextField
                startAdornment={
                  <IoIosSearch className="text-gray-600 text-2xl" />
                }
                name="name"
                placeholder="البحث حسب الاسم"
              />
            </div>
          </FormProvider>
        }
      >
        <div className="flex items-start gap-8">
          <div
            className={`grid grid-cols-5  gap-4 ${
              selectedProducts.length > 0 && "!grid-cols-3"
            }`}
          >
            {data?.data.map((product: ProductData, index: number) => (
              <div
                onClick={() => {
                  setSelectedProduc({ ...product, quantity: 1 });
                  setOpen(true);
                }}
                key={index}
                className="p-4 bg-white h-fit rounded-xl cursor-pointer transition-all drop-shadow-lg items-center justify-center flex flex-col gap-4"
              >
                <p className="text-md">{product.name}</p>
                <img
                  src={`https://warsha.htc-company.com/public/getImage/${product.main_image.id}/${product.main_image.file_name}`}
                  alt={product.main_image.file_name}
                  className="w-[60px] aspect-square h-[60px]  object-cover"
                />
                <div className="w-full">
                  <div className="flex w-full justify-between text-xl">
                    <span className="text-lg">
                      {product.product_category.name}
                    </span>
                    <p className="text-lg">{product.price} $</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {selectedProducts.length > 0 && (
            <ContainerSellItem
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          )}
        </div>
        <ModalDetails
          selectedProducts={selectedProducts}
          setSelectedProduc={setSelectedProduc}
          setSelectedProducts={setSelectedProducts}
          Product={selectedProduc!}
          open={open!}
          setOpen={setOpen}
        />
      </PageContainer>
    </>
  );
}

export default SelItem;
