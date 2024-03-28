import { PageContainer } from "@/components/containers";
import { useQuery } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import moment from "moment";
import { CurrencyData } from "@/types";
import "moment/locale/ar";
import axios from "@/lib/axios";
import apiRoutes from "@/api";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
const Currencies = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["get-currencies"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.currency.index);
      return data.data;
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationPage, setPaginationPage] = useState({
    activePage: 1,
    perPage: 20,
  });
  const cols: TableColumn<CurrencyData>[] = [
    {
      id: "currency",
      name: "اسم العملة ",
      cell: (row) => <div title={row.currency}>{row.currency}</div>,
    },
    {
      id: "dollar_price",
      name: "سعر بالدولار",
      cell: (row) => (
        <div title={row.dollar_price.toString()}>{row.dollar_price}</div>
      ),
    },
    {
      id: "created_at",
      name: "تاريخ الانشاء",
      cell: (row) => (
        <div title={row.currency}>
          {moment(row.created_at).format("YYYY/MMMM/DDDD")}
        </div>
      ),
    },
    {
      id: "updated_at",
      name: "آخر تعديل",
      cell: (row) => (
        <div title={row.currency}>
          {moment(row.updated_at).format("YYYY/MMMM/DDDD")}
        </div>
      ),
    },
  ];
  return (
    <PageContainer
      table={{
        columns: cols,
        data: data?.data ?? [],
        loading: isFetching,
        error: error,
        paginationProps: {
          paginationPage: {
            activePage: searchParams.get("page") || paginationPage.activePage,
            perPage: searchParams.get("perPage") || paginationPage.perPage,
          },
          paginationTotal: 0,
          setPaginationPage: setPaginationPage,
        },
      }}
      breadcrumb={[{ title: "العملات" }]}
    ></PageContainer>
  );
};

export default Currencies;
