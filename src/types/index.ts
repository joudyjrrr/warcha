import {
  ThemeColors,
  StyleTypes,
  TableProps,
  TestProps,
  Images,
  ModalStates,
} from "./shared";
export type TResponse<
  DataType,
  isArray extends boolean | undefined = undefined
> = {
  IsSuccess: boolean;
  Message: string;
  data: isArray extends boolean ? DataType[] : DataType;
};
export type {
  ThemeColors,
  StyleTypes,
  TableProps,
  TestProps,
  ModalStates,
  Images,
};
