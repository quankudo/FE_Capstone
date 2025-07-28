import axiosClient from './axiosClient';

const cityApi = {
  getAllCities: () => axiosClient.get('/cities'),
};

export default cityApi;
