const AddPrefix = (url: string) => "/dashboard" + url;

const suppliers = {
  index: AddPrefix(`/getSupplier`),
  buttons: {
    add: AddPrefix(`/add`),
    update: AddPrefix(`/update`),
    delete: (id: string | number) => AddPrefix(`/delete/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default suppliers;
