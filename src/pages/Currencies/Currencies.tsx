import { PageContainer } from "@/components/containers";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import moment from "moment";

const Currencies = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["get-currencies"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://warsha.htc-company.com/public/api/dashboard/getPublicData?dollar_price&currency`
      );
      return data;
    },
  });
  console.log(data?.data?.data);
  const cols: TableColumn<any>[] = [
    {
      id: "currency",
      name: "Currency ",
      cell: (row) => <div title={row.currency}>{row.currency}</div>,
    },
    {
      id: "dollar_price",
      name: "Dollar Price ",
      cell: (row) => <div title={row.currency}>{row.dollar_price}</div>,
    },
    {
      id: "created_at",
      name: "Created at ",
      cell: (row) => (
        <div title={row.currency}>
          {moment(row.created_at).format("YYYY/MMMM/DDDD")}
        </div>
      ),
    },
    {
      id: "updated_at",
      name: "Updated at ",
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
        data: data && data?.data?.data,
        loading: isFetching,
      }}
    ></PageContainer>
  );
};

export default Currencies;
