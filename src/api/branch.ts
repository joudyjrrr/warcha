const AddPrefix = (url: string) => "/dashboard" + url;

const branch = {
  index: AddPrefix(`/getBranch`),
  buttons: {
    add: AddPrefix(`/createBranch`),
    update: (id: string | number) => `/updatePublicData/${id}`,
    delete: (id: string | number) => AddPrefix(`/delete/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default branch;
