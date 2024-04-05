const AddPrefix = (url: string) => "/dashboard" + url;

const sellItem = {
  index: AddPrefix(`/getProduct`),
  buttons: {
    add: AddPrefix(`/createSellItem`),
    update: (id: string | number) => `/updateProduct/${id}`,
    delete: (id: string | number) => AddPrefix(`/deleteProduct/${id}`),
  },
  show: (id: string|number) => AddPrefix(`/getProductAllDataById/${id}`),
};

export default sellItem;
