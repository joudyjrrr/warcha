const AddPrefix = (url: string) => "/dashboard" + url;

const Cars = {
  index: AddPrefix(`/getCarCollection`),
  buttons: {
    add: AddPrefix(`/createCarCollection`),
    update:(id: string | number) => AddPrefix(`/updateCarCollection/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteCarCollection/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default Cars;
