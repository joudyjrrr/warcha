const AddPrefix = (url: string) => "/dashboard" + url;

const serviceDepartment = {
  index: AddPrefix(`/getServiceDepartment`),
  buttons: {
    add: AddPrefix(`/createServiceDepartment`),
    update:  (id: string | number) => AddPrefix(`/updateServiceDepartment/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteServiceDepartment/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default serviceDepartment;
