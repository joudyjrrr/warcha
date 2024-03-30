const AddPrefix = (url: string) => "/dashboard" + url;

const CarColor = {
  index: AddPrefix(`/getCarColor`),
  buttons: {
    add: AddPrefix(`/createCarColor`),
    update: AddPrefix(`/updateCarColor`),
    delete: (id: string | number) => AddPrefix(`/DeleteCarColor/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default CarColor;
