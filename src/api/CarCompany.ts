const AddPrefix = (url: string) => "/dashboard" + url;

const CarCompany = {
  index: AddPrefix(`/getCarCompany`),
  buttons: {
    add:  AddPrefix(`/createCarCompany`),
    update: (id: string | number) => AddPrefix(`/updateCarCompany/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteCarCompany/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default CarCompany;
