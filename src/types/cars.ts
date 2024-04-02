import { CarCompanyData } from "./carCompany";
import { CarTypeDate } from "./carType";



export type CarsData = {
  id:number;
  name:string;
  car_type:CarTypeDate;
  car_company:CarCompanyData;
  created_at:string;
  image:{
     id:string;
     file_name:string;
  }
  updated_at:string;
  
  model:string;
  horsepower:string;
  motor_cc:string
}

export type CarsForm = {
    name:string;

}