const AddPrefix = (url: string) => "/dashboard" + url;

const suppliers = {
  index: AddPrefix(`/getSupplier`),
  buttons: {
    add: AddPrefix(`/createSupplier`),
    update: AddPrefix(`/updateSupplier`),
    delete: (id: string | number) => AddPrefix(`/deleteSupplier/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default suppliers;
