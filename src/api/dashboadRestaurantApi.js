import axiosClient from './axiosClient';

const dashboadRestaurantApi = {
  getAllInfo: (id, scope = 'today') => axiosClient.get(`/restDashboard`, {
    params: { id, scope },
  }),
};


export default dashboadRestaurantApi;
