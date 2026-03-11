import { axiosInstance } from '../lib/axios';

export const orderApi = {
  create: async (orderData) => {
    const { data } = await axiosInstance.post('/orders', orderData);
    return data;
  },

  getById: async (id) => {
    const { data } = await axiosInstance.get(`/orders/${id}`);
    return data;
  },

  getAll: async () => {
    const { data } = await axiosInstance.get('/orders');
    return data;
  },
};
