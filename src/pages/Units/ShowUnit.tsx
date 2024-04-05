import apiRoutes from "@/api";
import { PageContainer } from "@/components/containers";
import { Badge } from "@/components/ui/badge";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";

function ShowUnit() {
  const { unitId } = useParams();
  const { data, isFetching, error } = useQuery({
    queryKey: ["get-unit"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.units.show(unitId!));
      return data.data;
    },
  });
  console.log("data:", data);
  if (isFetching) return <p>loading</p>;
  if (error) return <p>error</p>;
  return (
    <PageContainer
      breadcrumb={[
        { title: "الوحدات", href: "/settings/units" },
        { title: data.name },
      ]}
    >
      <div className="grid grid-cols-7 gap-8">
        <div className="col-span-3">
          <QRCode className="w-full h-auto" value={data.bar_code} />
        </div>
        <div className="col-span-4 flex flex-col gap-6 text-xl">
          <h2 className="text-3xl text-primary font-semibold">{data.name}</h2>
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-2xl">تاريخ الانشاء : </p>
            <p className="text-gray-500">
              {moment(data.created_at).format("YYYY/MM/DD")}
            </p>
          </div>
          <div className="p-4 rounded-xl shadow-md grid grid-cols-2 bg-primary/10">
            <h2 className="font-semibold text-2xl text-primary col-span-2">
              ارتباطات الوحدة
            </h2>
            <div className="flex gap-4 px-2 text-xl">
              <p className="font-semibold">المنتج : </p>
              <p>{data.price} $</p>
            </div>
            <div className="flex gap-4 px-2 text-xl">
              <p className="font-semibold"> مقدار الحسم: </p>{" "}
              <p>{data.price_discount} %</p>
            </div>
          </div>
          {data.note && (
            <div>
              <p className="font-semibold text-2xl">ملاحظات : </p>
              <p className="text-gray-500">{data.note}</p>
            </div>
          )}
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-2xl">حجم الوحدة :</p>
            <Badge
              variant={data.is_bigger ? "default" : "secondary"}
              className="p-2 text-md"
            >
              {data.is_bigger ? "كبيرة" : "صغيرة"}
            </Badge>
          </div>
          <div className="p-4 rounded-xl shadow-md grid grid-cols-2 bg-primary/10">
            <h2 className="font-semibold text-2xl text-primary col-span-2">
              بيع بالقطعة
            </h2>
            <div className="flex gap-4 px-2 text-xl">
              <p className="font-semibold">سعر البيع : </p>
              <p>{data.price} $</p>
            </div>
            <div className="flex gap-4 px-2 text-xl">
              <p className="font-semibold"> مقدار الحسم: </p>{" "}
              <p>{data.price_discount} %</p>
            </div>
          </div>
          <div className="p-4 rounded-xl shadow-md grid gap-4 grid-cols-2 bg-primary/10">
            <h2 className="font-semibold text-2xl text-primary col-span-2">
              بيع بالجملة
            </h2>
            <div className="flex gap-4 px-2 text-xl">
              <p className="font-semibold">سعر البيع : </p>
              <p>{data.multiple_price} $</p>
            </div>
            <div className="flex gap-4 px-2 text-xl">
              <p className="font-semibold"> مقدار الحسم: </p>
              <p>{data.multiple_price_discount} %</p>
            </div>
            <div className="flex gap-4 px-2 text-xl col-span-2">
              <p className="font-semibold"> شرط الحسم: </p>
              <p>شراء {data.min_multiple_count} وحدة</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default ShowUnit;
