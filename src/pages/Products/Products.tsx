import { PageContainer } from "@/components/containers";
import { useQuery } from "@tanstack/react-query";
import { ProductData } from "@/types";
import "moment/locale/ar";
import axios from "@/lib/axios";
import apiRoutes from "@/api";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const Products = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["get-products"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.product.index);
      return data.data;
    },
  });

  console.log("data: ", data);
  if (isFetching) return <p>loading</p>;
  if(error) return <p>error</p>
  return (
    <PageContainer
      addLink={{
        children: (
          <>
            <FaPlus className="text-white text-md" />
            <p>إضافة منتج</p>
          </>
        ),
        to: `/products/form`,
      }}
      breadcrumb={[{ title: "المنتجات" }]}
    >
      <div className="grid grid-cols-4 gap-7">
        {data?.data.map((product: ProductData, index: number) => (
          <Link
            to={`/products/${product.id}`}
            key={index}
            className="p-4 bg-white rounded-md transition-all drop-shadow-lg items-center justify-center flex flex-col gap-4"
          >
            <p>{product.name}</p>
            <img
              src={`https://warsha.htc-company.com/public/getImage/${product.main_image.id}/${product.main_image.file_name}`}
              alt={product.main_image.file_name}
              className="w-2/3 aspect-square object-cover"
            />
            <div className="w-full">
              <div className="flex w-full justify-between">
                {product.product_category.name}
                <p>{product.price} $</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
};

export default Products;
