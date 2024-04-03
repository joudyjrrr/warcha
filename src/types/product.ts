export type ProductData = {
  evaluation: number;
  main_image_id: number;
  name: string;
  price: number;
  is_active: number;
  product_category_id: number;
  product_category: {
    id: number;
    name: string;
  };
  id:number;
  main_image: {
    id: number;
    file_name: string;
    model_id: number;
    disk: string;
    original_url: string;
    preview_url: string;
  };
};

export type ProductFormValues = {
  evaluation: number;
  main_image_id: number;
  name: string;
  price: number;
  is_active: number;
  product_category_id: number;
  product_category: {
    id: number;
    name: string;
  };
  id: number;
  main_image: {
    id: number;
    file_name: string;
    model_id: number;
    disk: string;
    original_url: string;
    preview_url: string;
  };
};