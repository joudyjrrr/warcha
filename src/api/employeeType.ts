const AddPrefix = (url: string) => "/dashboard" + url;

const employeeType = {
  index: AddPrefix(`/getEmployeeType`),
  buttons: {
    add: AddPrefix(`/createEmployeeType`),
    update: AddPrefix(`/update`),
    delete: (id: string | number) => AddPrefix(`/deleteEmployeeType/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default employeeType;
