export type SupplierData = {
  id: number;
  name: string;
  phone: string;
  address: string;
  money: string;
  opening_balance: string;
  created_at: Date;
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
