import axiosClient from './axiosClient';

const dishApi = {
    getDishById: (id) => axiosClient.get(`/dishes/${id}`),
    getDishTypes: (id) => axiosClient.get(`/dishes/types`),
    getTopDishes: () => axiosClient.get(`/dishes/top`),
    getSuggestDishes: () => axiosClient.get(`/dishes/suggest`),
    getAllDishesByRestId: (id) => axiosClient.get(`/dishes/rest/${id}`),
    getTopDishesByRestId: (id) => axiosClient.get(`/dishes/rest/top/${id}`),
    getAllDishes: (params) => axiosClient.get(`/dishes`, {params}),
    getStatsDishes: (id) => axiosClient.get(`/dishes/stats/${id}`),
};

export default dishApi;
