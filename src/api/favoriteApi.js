import axiosClient from './axiosClient';

const favoriteApi = {
  getFavoriteRestaurants: (id) => axiosClient.get(`/favorites/restaurants/${id}`),
  getFavoriteDishes: (id) => axiosClient.get(`/favorites/dishes/${id}`),
  addFavoriteRestaurant: (data) => axiosClient.post('/favorites/restaurants', data),
  removeFavoriteDish: (id) => axiosClient.delete(`/favorites/dishes/${id}`),
};

export default favoriteApi;
