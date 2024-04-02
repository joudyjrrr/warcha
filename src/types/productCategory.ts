export type ProductCategoryData = {
  name: string;
  created_at: Date;
  updated_at: Date;
  image: {
    id:string;
    file_name: string;
    original_url: string;
  };
  id:number
};


export type ProductCategoryForm = {
  id?:number
  name: string;
  image?:string
}