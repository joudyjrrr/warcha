import apiRoutes from "@/api";
import { PageContainer } from "@/components/containers";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SwiperClass from "swiper/types/swiper-class";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Controller,
  FreeMode,
  Navigation,
  Thumbs,
} from "swiper/modules";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { MdClose } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
function ShowProduct() {
  const { productId } = useParams();
  const { data, isFetching, error } = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.product.show(productId!));
      return data.data;
    },
  });
  const {
    data: dataTest,
    isFetching: isFetchingTest,
    error: errorTest,
  } = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.product.show(productId!));
      return data.data;
    },
  });
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  const [firstSwiper, setFirstSwiper] = useState<SwiperClass>();
  const [secondSwiper, setSecondSwiper] = useState<SwiperClass>();
  const swiper1Ref = useRef<any>(null);
  const swiper2Ref = useRef();
  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);
  console.log("data: ", data);
  if (isFetching) return <p>loading</p>;
  if (error) return <p>error</p>;
  return (
    <PageContainer
      breadcrumb={[
        { title: "المنتجات", href: "/products" },
        { title: data.name },
      ]}
    >
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-5">
          <div className="col-span-1 md:col-span-4">
            <Swiper
              onSwiper={(swiper: any) => {
                if (swiper1Ref.current !== null) {
                  swiper1Ref.current = swiper;
                }
              }}
              controller={{ control: secondSwiper }}
              spaceBetween={10}
              slidesPerView={1}
              grabCursor={true}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[FreeMode, Navigation, Thumbs, Controller, Autoplay]}
              className="h-80 w-full rounded"
              style={
                {
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                } as CSSProperties
              }
            >
              {data?.images.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    className="h-full w-full object-cover"
                    src={`https://warsha.htc-company.com/public/getImage/${image.id}/${image.file_name}`}
                    alt={image.file_name}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              controller={{ control: firstSwiper }}
              loop={false}
              spaceBetween={10}
              slidesPerView={
                Array.isArray(data?.images)
                  ? data.images.length > 2
                    ? 3
                    : 1
                  : 1
              }
              watchSlidesProgress
              touchRatio={0.2}
              slideToClickedSlide={true}
              onSwiper={setThumbsSwiper}
              modules={[Navigation, Thumbs, Controller]}
              className="mt-5 h-28 w-full rounded-xl"
            >
              {Array.isArray(data?.images) &&
                data?.images.map((image: any, index: number) => (
                  <SwiperSlide key={index} className="w-full">
                    <img
                      className="h-full w-full object-cover"
                      src={`https://warsha.htc-company.com/public/getImage/${image.id}/${image.file_name}`}
                      alt={image.file_name}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        <div className="col-span-7 flex flex-col gap-8">
          <div className="flex justify-between w-full font-semibold items-center">
            <div>
              <div className="flex gap-4 mb-4 items-center">
                <h2 className="text-2xl text-gray-400">{data.name}</h2>
                <Badge
                  variant={data.is_active ? "default" : "destructive"}
                  className="text-white"
                >
                  {data.is_active ? "فعال" : "غير فعال"}
                </Badge>
              </div>
              <h3 className="text-xl">{data.product_category.name}</h3>
            </div>
            <h3 className="text-lg">
              {moment(data.created_at).format("YYYY/MMMM/DD")}
            </h3>
          </div>
          <div className="">
            <h3 className="text-lg mb-4">الوصف</h3>
            <p className="text-lg text-gray-500">{data.description}</p>
          </div>
          <div className="flex w-full gap-4 text-xl">
            <p className="font-semibold">سعر البيع : </p> <p>{data.price} $</p>
          </div>
          <div className="flex gap-6">
            <div className="w-1/3">
              <QRCode className="w-full h-auto" value={data.bar_code} />
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              variant={"cancel"}
              className="flex gap-2 items-center justify-center w-full transition-all hover:bg-red-500 hover:text-white"
            >
              <RiDeleteBin6Line size={"1.5rem"} className="" />
              <p>حذف المنتج</p>
            </Button>
            <Button
              variant={"default"}
              asChild
              className="flex gap-2 items-center justify-center w-full"
            >
              <Link to={`/products/form/${data.id}`}>
                <FaRegEdit size={"1.5rem"} />
                <p>تعديل المنتج</p>
              </Link>
            </Button>
          </div>
        </div>
        <div className="col-span-12 p-4 drop-shadow-lg flex items-center">
          <Line options={options} data={data} />;
        </div>
      </div>
    </PageContainer>
  );
}

export default ShowProduct;
