import apiRoutes from "@/api";
import { PageContainer } from "@/components/containers";
import axios from "@/lib/axios";
import { ServiceData } from "@/types/serviceDepartment";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ContainerSellItem from "./ContainerSellItem";

const SellItem = () => {
  const [selectedService, setSelectedService] = useState<ServiceData[]>([]);

  const { data: Service } = useQuery({
    queryKey: ["get-Service"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.service.index);
      return data?.data;
    },
  });
  const handleServiceSelect = (serv: ServiceData) => {
    if (selectedService.includes(serv)) {
      setSelectedService(selectedService.filter((p) => p !== serv));
    } else {
      setSelectedService([...selectedService, { ...serv , quantity:1 }]);
    }
  };
  return (
    <PageContainer breadcrumb={[{ title: " مبيعات جديدة" }]}>
      <div className="flex items-start">
        <div className={`grid grid-cols-4  gap-4 `}>
          {Service?.data.map((product: ServiceData, index: number) => (
            <div
              onClick={() => {
                handleServiceSelect(product);
              }}
              key={index}
              className="p-4 bg-white  h-fit rounded-xl cursor-pointer transition-all drop-shadow-lg items-center justify-center flex flex-col gap-4"
            >
              <p className="text-lg">{product.name}</p>
              <img
                src={`https://warsha.htc-company.com/public/getImage/${product.image.id}/${product.image.file_name}`}
                alt={product.image.file_name}
                className="w-[60px] aspect-square h-[60px]  object-cover"
              />
              <div className="w-full">
                <div className="flex w-full justify-between text-xl">
                  <p className="text-lg">{product.price} $</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ContainerSellItem
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </div>
    </PageContainer>
  );
};

export default SellItem;
