import axiosClient from './axiosClient';

const restaurantApi = {
    getRestaurants: (params) => axiosClient.get('/restaurants', {params}),
    getRestaurantById: (id) => axiosClient.get(`/restaurants/${id}`),
    getRestaurantByUserId: (id) => axiosClient.get(`/restaurants/users/${id}`),
    getAllRestaurants: () => axiosClient.get('/restaurants/getAll'),
    getTopRestaurants: () => axiosClient.get('/restaurants/top'),
    getTypeRestaurants: () => axiosClient.get('/restaurants/types'),
};

export default restaurantApi;
