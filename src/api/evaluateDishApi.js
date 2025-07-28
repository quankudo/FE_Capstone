import axiosClient from './axiosClient';

const evaluateDishApi = {
    getEvaluateByDishId: (id) => axiosClient.get(`/evaluate/dishes/${id}`),
};

export default evaluateDishApi;
