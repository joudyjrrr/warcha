import apiRoutes from "@/api";
import { PageContainer } from "@/components/containers";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React, { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ContainerSellItemService from "./ContainerSellItemService";
import { ProductData } from "@/types";
import ModalDetails from "./ModalDetails";
import { ServiceData } from "@/types/serviceDepartment";
import AddCar from "./AddCar";

const SllItemService = () => {
  const { data: Products } = useQuery({
    queryKey: ["get-products"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.product.index);
      return data?.data;
    },
  });
  const { data: Service } = useQuery({
    queryKey: ["get-Service"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.service.index);
      return data?.data;
    },
  });
  console.log(Service?.data);
  const { data: Customer } = useQuery({
    queryKey: ["get-customer"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.customer.index);
      return data.data;
    },
    select: (data) =>
      data.data.map((d: any) => ({
        id: d.customer_id,
        name: d.name,
      })),
  });
  const { data: Cars } = useQuery({
    queryKey: ["get-car"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.cars.indexCars);
      return data.data;
    },
    select: (data) =>
      data.data.map((d: any) => ({
        id: d.name,
        name: d.name,
      })),
  });
  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceData[]>([]);
  const [openCarModel, setopenCarModel] = useState<boolean>(false);

  const [selectedProduc, setSelectedProduc] = useState<ProductData>();
  const [open, setOpen] = useState<boolean>();
  const handleSeriveSelect = (serv: ServiceData) => {
    if (selectedService.includes(serv)) {
      setSelectedService(selectedService.filter((p) => p !== serv));
    } else {
      setSelectedService([...selectedService, { ...serv, quantity: 1 }]);
    }
  };
  const methods = useForm();
  const { handleSubmit } = methods;
  return (
    <PageContainer>
      <div className="flex gap-4 w-full p-4">
        <div className="flex flex-col gap-4">
          <div className="bg-[#E4F3FF] h-[28rem] shadow p-4 rounded-lg">
            <FormProvider onSubmit={handleSubmit(() => {})} methods={methods}>
              <div className="flex flex-col">
                <div className="flex">
                  <RHFSelect name="car" options={Customer} label="اختر زبون" />
                </div>
                <div className="flex gap-4 items-center ">
                  <RHFSelect name="car" options={Cars} label="السيارات" />
                  <Button
                    className="mt-4"
                    onClick={() => setopenCarModel(true)}
                  >
                    أضافة
                    <FaPlus className="text-white text-md" />
                  </Button>
                  <RHFTextField name="km" placeholder="Km" />
                </div>
              
                <div className="flex gap-4 items-center ">
                  <RHFSelect
                    name="car"
                    options={[{ id: "0", name: "options" }]}
                    label="فني الصيانة"
                  />
                  <Button className="mt-4">
                    أضافة
                    <FaPlus className="text-white text-md" />
                  </Button>
                  <RHFTextField name="Date" placeholder="Date" />
                </div>
                <div className="flex gap-4 items-center ">
                  <RHFSelect
                    name="car"
                    options={[{ id: "0", name: "options" }]}
                    label="التشخيص الأولي"
                  />
                  <Button className="mt-4">
                    أضافة
                    <FaPlus className="text-white text-md" />
                  </Button>
                  <RHFTextField name="Date" placeholder="comments" />
                </div>
              </div>
            </FormProvider>
          </div>
          <div className="flex flex-col  pb-4 border-b border-black">
            <div className="">
              <h1 className="text-lg font-sm">المنتجات</h1>
            </div>
            <Swiper
              style={
                {
                  "--swiper-navigation-color": "#333",
                  "--swiper-pagination-color": "#333",
                  position: "relative",
                } as CSSProperties
              }
              className="w-[500px] rounded"
              // install Swiper modules
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {Products?.data?.map((product: any, index: number) => (
                <SwiperSlide
                  onClick={() => {
                    setSelectedProduc({ ...product, quantity: 1 });
                    setOpen(true);
                  }}
                  className="p-4 bg-white h-fit rounded-xl cursor-pointer transition-all drop-shadow-lg items-center justify-center flex flex-col gap-4"
                  key={index}
                >
                  <p className="text-md">{product.name}</p>
                  <img
                    src={`https://warsha.htc-company.com/public/getImage/${product.main_image.id}/${product.main_image.file_name}`}
                    alt={product.main_image.file_name}
                    className="w-[60px] aspect-square h-[60px]  object-cover"
                  />
                  <div className="w-full">
                    <div className="flex w-full justify-between text-xl">
                      <span className="text-sm">
                        {product.product_category.name}
                      </span>
                      <p className="text-sm">{product.price} $</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              ...
            </Swiper>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-sm">الخدمات</h1>
            <Swiper
              style={
                {
                  "--swiper-navigation-color": "#333",
                  "--swiper-pagination-color": "#333",
                  position: "relative",
                } as CSSProperties
              }
              className=" w-[500px] rounded"
              // install Swiper modules
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {Service?.data?.map((product: any, index: number) => (
                <SwiperSlide
                  onClick={() => handleSeriveSelect(product)}
                  className="p-4 bg-white h-fit rounded-xl cursor-pointer transition-all drop-shadow-lg items-center justify-center flex flex-col gap-4"
                  key={index}
                >
                  <p className="text-sm font-sm">{product.name}</p>
                  <img
                    src={`https://warsha.htc-company.com/public/getImage/${product.image.id}/${product.image.file_name}`}
                    alt={product.image.file_name}
                    className="w-[60px] aspect-square h-[60px]  object-cover"
                  />
                  <div className="w-full">
                    <div className="flex w-full justify-between text-xl">
                      <p className="text-sm">{product.price} $</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              ...
            </Swiper>
          </div>
        </div>
        <ContainerSellItemService
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </div>
      <ModalDetails
        selectedProducts={selectedProducts}
        setSelectedProduc={setSelectedProduc}
        setSelectedProducts={setSelectedProducts}
        Product={selectedProduc!}
        open={open!}
        setOpen={setOpen}
      />
      <AddCar open={openCarModel} setOpen={setopenCarModel} />
    </PageContainer>
  );
};

export default SllItemService;
