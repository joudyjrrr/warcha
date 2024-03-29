import { TableColumn } from "react-data-table-component";

export type ThemeColors =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "dark"
  | "gradient"
  | "semiDark";

export type StyleTypes = "fill" | "outline";

export type ModalStates = "delete" | "add" | "edit" | "show" | "toggle" | null;

export type TableProps<T = any> = {
  paginationProps: {
    paginationPage: { activePage: number | string; perPage: number | string };
    paginationTotal: number;
    setPaginationPage: React.Dispatch<
      React.SetStateAction<{ activePage: number; perPage: number }>
    >;
  };
  // setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean;
  error: any;
  data: T[];
  columns: TableColumn<T>[];
  setSortColumn?: React.Dispatch<React.SetStateAction<any>>;
};
export type Images = {
  created_at: Date;
  file_name: string;
  file_path: string;
  id: number;
};
export type TestProps = {
  id: number;
  name: string;
  price: number;
  date: Date;
  numberOfParts: number;
};

export type SelectedField = {
  id: number;
  value: string;
};
export type SelectOptions = {
  id:string;
  name:string;
}