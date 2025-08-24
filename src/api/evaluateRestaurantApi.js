import axiosClient from './axiosClient';

const evaluateRestaurantApi = {
    getEvaluateByRestId: (id) => axiosClient.get(`/evaluate/restaurants/${id}`),
    getEvaluateByUserId: (id) => axiosClient.get(`/evaluate/restaurants/users/${id}`),
    AddEvaluate: (body) => axiosClient.post(`/evaluate/restaurants`, body),
};

export default evaluateRestaurantApi;