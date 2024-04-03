export type BrnachesData = {
    id:string;
    admin_id:string;
    branch_balance:number;
    city:string;
    address:string;
    phone:string;
    creditor:number;
    debtor:number;
    location :{
        name:string;
        latitude:number;
        longitude:number;
    }
    name:string;
    
}
export type BrnacheForm = {
    admin_id:string;
    branch_balance:number;
    city:string;
    address:string;
    phone:string;
    name:string;
    latitude:number;
    longitude:number;
}