import { number } from "yup";


export type CarTypeDate = {
    id: number;
    gear: string;
    fuel: string
    created_at?: Date;
    updated_at?: Date;
}