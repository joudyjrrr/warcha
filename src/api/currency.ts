const AddPrefix = (url: string) => "/dashboard" + url;

const currency = {
  index: AddPrefix(`/getPublicData`),
  buttons: {
    add: AddPrefix(`/createPublicData`),
    update: (id: string | number) => `/updatePublicData/${id}`,
    delete: (id: string | number) => AddPrefix(`/delete/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default currency;
