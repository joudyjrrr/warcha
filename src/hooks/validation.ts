import { number, object, string } from "yup";

export const CuuecisValidation = object().shape({
    dollar_price : number().required("الحقل مطلوب"),
    currency : string().required("الحقل مطلوب"),
  });

  export const PerTypeValidation = object().shape({
    name : string().required("الحقل مطلوب"),
  });