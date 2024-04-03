const AddPrefix = (url: string) => "/dashboard" + url;

const branch = {
  index: AddPrefix(`/getBranch`),
 getAdmin: AddPrefix(`/getAdmin`),
  buttons: {
    add: AddPrefix(`/createBranch`),
    update: (id: string | number) => AddPrefix(`/delete/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteBranch/${id}`),
  },
  show: (id: string) => AddPrefix(`getBranchExpensById/${id}`),
};

export default branch;
