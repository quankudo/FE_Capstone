import axiosClient from './axiosClient';

const eventApi = {
    getAllEvents: (isActive) => axiosClient.get(`/events/type?activeOnly=${isActive}`),
    getEventsByRestId: (id) => axiosClient.get(`/events/restaurants/${id}`),
    getAllEventsByRest: (params) => axiosClient.get(`/events`, {params}),
};

export default eventApi;
