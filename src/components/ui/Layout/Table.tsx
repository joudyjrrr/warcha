"use client";
// classNames
import { cn } from "@/lib/utils";
// DataTable
import DataTable from "react-data-table-component";
// icons
import { FaInfoCircle } from "react-icons/fa";
import { TableProps } from "@/types";
import { Loader2 } from "lucide-react";
type DataTableProps = {
  table: TableProps;
  [props: string]: unknown;
};
const Table = ({ table, ...props }: DataTableProps) => {
  return (
    <DataTable
      noHeader
      sortServer
      selectableRows={props.selectedRowsActionsItems ? true : false}
      responsive={true}
      columns={table.columns}
      data={table.data}
      progressComponent={
        <div
          className={cn(
            "flex h-[400px] w-full items-center justify-center gap-4 rounded-lg bg-background p-2  text-2xl text-gray-400"
          )}
        >
          <h3 className="py-12 text-center font-semibold">
            جار تحميل البيانات
          </h3>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" size={"2.5rem"} />
        </div>
      }
      customStyles={{
        table: {
          style: {
            background: "var(--background-color)",
            border: table.data.length === 0 ? "none" : "1px solid #dbdade",
          },
        },
      }}
      progressPending={table.loading}
      noDataComponent={
        <div
          className={cn(
            {
              "border-t-0": props.pageTabs,
            },
            "flex h-[400px] w-full items-center justify-center gap-4 rounded-lg border-none bg-background  p-2 text-2xl text-gray-400"
          )}
        >
          <FaInfoCircle />
          <h3 className="py-12 text-center font-semibold">لا يوجد بيانات</h3>
        </div>
      }
    />
  );
};
export default Table;
