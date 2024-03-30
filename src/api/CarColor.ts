const AddPrefix = (url: string) => "/dashboard" + url;

const CarColor = {
  index: AddPrefix(`/getCarColor`),
  buttons: {
    add: AddPrefix(`/createCarColor`),
    update: (id: string | number) => `/updateCarModel/${id}`,
    delete: (id: string | number) => AddPrefix(`/DeleteCarModel/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default CarColor;
