import axiosClient from './axiosClient';

const evaluateRestaurantApi = {
    getEvaluateByRestId: (id) => axiosClient.get(`/evaluate/restaurants/${id}`),
};

export default evaluateRestaurantApi;
