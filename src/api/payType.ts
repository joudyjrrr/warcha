const AddPrefix = (url: string) => "/dashboard" + url;

const payType = {
  index: AddPrefix(`/getPayType`),
  buttons: {
    add: AddPrefix(`/createPayType?`),
    update: (id: string | number) => AddPrefix(`/updatePayType/${id}`),
    delete: (id: string | number) => AddPrefix(`/deletePayType/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default payType;
