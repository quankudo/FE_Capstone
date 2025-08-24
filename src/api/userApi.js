import axiosClient from './axiosClient';

const userApi = {
    login: (data) => axiosClient.post('/users/login', data),
    register: (data) => axiosClient.post('/users/register', data),
    getAllUsers: (params) => axiosClient.get('/users/', {params}),
    getUsersById: (id) => axiosClient.get(`/users/info/${id}`),
};

export default userApi;
