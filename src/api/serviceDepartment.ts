const AddPrefix = (url: string) => "/dashboard" + url;

const serviceDepartment = {
  index: AddPrefix(`/getServiceDepartment`),
  buttons: {
    add: AddPrefix(`/createServiceDepartment`),
    update: AddPrefix(`/update`),
    delete: (id: string | number) => AddPrefix(`/delete/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default serviceDepartment;
