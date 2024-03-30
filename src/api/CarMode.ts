const AddPrefix = (url: string) => "/dashboard" + url;

const CarMode = {
  index: AddPrefix(`/getCarModel`),
  buttons: {
    add: AddPrefix(`/createCarModel`),
    update: (id: string | number) => `/updateCarModel/${id}`,
    delete: (id: string | number) => AddPrefix(`/DeleteCarModel/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default CarMode;
