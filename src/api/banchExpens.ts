const AddPrefix = (url: string) => "/dashboard" + url;

const banchExpens = {
  index: AddPrefix(`/getBranchExpens`),
  buttons: {
    add: AddPrefix(`/createBranchExpens`),
    update: (id: string | number) => `/updatePublicData/${id}`,
    delete: (id: string | number) => AddPrefix(`/delete/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default banchExpens;
