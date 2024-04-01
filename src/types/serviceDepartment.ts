export type ServiceDepartmentData = {
  id: number;
  name: string;
  description: string;
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

export type ServiceDepartmenForm = {
  id?:number
  name: string;
  description?: string;
}