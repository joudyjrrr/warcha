const AddPrefix = (url: string) => "/dashboard" + url;

const currency = {
  index: AddPrefix(`/getPublicData`),
  buttons: {
    add: AddPrefix(`/createPublicData`),
    update: (id: string | number) => AddPrefix(`/updatePublicData/${id}`),
    delete: (id: string | number) => AddPrefix(`/deletePublicData/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default currency;
