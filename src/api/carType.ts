const AddPrefix = (url: string) => "/dashboard" + url;

const CarType = {
    index: AddPrefix(`/getCarTypeCollection`),
    buttons: {
        add: AddPrefix(`/createCarTypeCollection`),
        update:(id: string | number) =>  AddPrefix(`/updateCarCollection/${id}`),
        delete: (id: string | number) => AddPrefix(`/deleteCarTypeCollection/${id}`),
    },
    show: (id: string) => AddPrefix(`/${id}`),
};

export default CarType;
