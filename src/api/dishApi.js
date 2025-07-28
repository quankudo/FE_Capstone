import axiosClient from './axiosClient';

const dishApi = {
    getDishById: (id) => axiosClient.get(`/dishes/${id}`),
    getAllDishesByRestId: (id) => axiosClient.get(`/dishes/rest/${id}`),
};

export default dishApi;
