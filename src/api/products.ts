const AddPrefix = (url: string) => "/dashboard" + url;

const product = {
  index: AddPrefix(`/getProduct`),
  buttons: {
    add: AddPrefix(`/createProduct`),
    update: (id: string | number) => `/updateProduct/${id}`,
    delete: (id: string | number) => AddPrefix(`/deleteProduct/${id}`),
  },
  show: (id: string|number) => AddPrefix(`/getProductById/${id}`),
};

export default product;
