import axiosClient from './axiosClient';

const evaluateDishApi = {
    getEvaluateByDishId: (id) => axiosClient.get(`/evaluate/dishes/${id}`),
    getEvaluateByUserId: (id) => axiosClient.get(`/evaluate/dishes/users/${id}`),
    getEvaluateByRestId: (id) => axiosClient.get(`/evaluate/dishes/restaurants/${id}`),
    AddEvaluate: (body) => axiosClient.post(`/evaluate/dishes`, body),

};

export default evaluateDishApi;
