const AddPrefix = (url: string) => "/dashboard" + url;

const customer = {
  index: AddPrefix(`/getCustomer`),
  buttons: {
    add: AddPrefix(`/createBranch`),
    update: (id: string | number) => AddPrefix(`/updateBranch/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteBranch/${id}`),
  },
  show: (id: string) => AddPrefix(`getBranchExpensById/${id}`),
};

export default customer;
