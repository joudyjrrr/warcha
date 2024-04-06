import { type } from "os"


export type SellItemData = {
    id:number;
    branch :{
        id:string;
        name:string;
    }
    customer:{
        id:string;
        name:string;
    }
    total_price:number;
    delivery:string;
    status:string;
    created_at: Date;
    updated_at: Date;
}