import axiosClient from './axiosClient';

const restaurantApi = {
    getRestaurants: (params) => axiosClient.get('/restaurants', {params}),
    getRestaurantById: (id) => axiosClient.get(`/restaurants/${id}`),
    getAllRestaurants: () => axiosClient.get('/restaurants/getAll'),
};

export default restaurantApi;
