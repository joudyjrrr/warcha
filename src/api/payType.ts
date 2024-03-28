const AddPrefix = (url: string) => "/dashboard/getPayType" + url;

const payType = {
  index: AddPrefix(``),
  buttons: {
    add: AddPrefix(`/add`),
    update: AddPrefix(`/update`),
    delete: (id: string | number) => AddPrefix(`/delete/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default payType;
