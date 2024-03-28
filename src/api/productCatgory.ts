const AddPrefix = (url: string) => "/dashboard" + url;

const productCatgory = {
  index: AddPrefix(`/getProductCategory`),
  buttons: {
    add: AddPrefix(`/createProductCategory`),
    update: AddPrefix(`/update`),
    delete: (id: string | number) => AddPrefix(`/delete/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default productCatgory;
