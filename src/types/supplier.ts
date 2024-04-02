export type SupplierData = {
  id: number;
  name: string;
  phone: string;
  address: string;
  money: string;
  opening_balance: string;
  created_at: Date;
  currency:string;
  updated_at: Date;
  image: {
    id: number;
    file_name: string;
    model_id: number;
    disk: string;
    original_url: string;
    preview_url: string;
  };
};

export type SupplierForm = {
  id:number;
  name: string;
  phone: string;
  address:string;
  currency: string;
  opening_balance: string;
}