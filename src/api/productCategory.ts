const AddPrefix = (url: string) => "/dashboard" + url;

const productCategory = {
  index: AddPrefix(`/getProductCategory`),
  buttons: {
    add: AddPrefix(`/createProductCategory`),
    update: AddPrefix(`/update`),
    delete: (id: string | number) => AddPrefix(`/deleteProductCategory/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default productCategory;
