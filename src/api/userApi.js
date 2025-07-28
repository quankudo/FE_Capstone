import axiosClient from './axiosClient';

const userApi = {
    login: (data) => axiosClient.post('/users/login', data),
    register: (data) => axiosClient.post('/users/register', data),
    getAllUsers: () => axiosClient.get('/users/'),
    getUsersById: (id) => axiosClient.get(`/users/${id}`),
};

export default userApi;
