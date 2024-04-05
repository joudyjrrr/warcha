const AddPrefix = (url: string) => "/dashboard" + url;

const workShops = {
  index: AddPrefix(`/getWorkShop`),
  buttons: {
    add: AddPrefix(`/createUnit`),
    update: (id: string | number) => AddPrefix(`/updateUnit/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteWorkShop/${id}`),
  },
  show: (id: string) => AddPrefix(`/getWorkShopById/${id}`),
  search: AddPrefix("/getWorkShopName"),
};

export default workShops;
