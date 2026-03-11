import { axiosInstance } from '../lib/axios';

export const collectionApi = {
  getAll: async () => {
    const { data } = await axiosInstance.get('/collections');
    return data.data;
  },

  create: async (payload) => {
    const { data } = await axiosInstance.post('/collections', payload);
    return data;
  },

  update: async (id, payload) => {
    const { data } = await axiosInstance.put(`/collections/${id}`, payload);
    return data;
  },

  delete: async (id) => {
    const { data } = await axiosInstance.delete(`/collections/${id}`);
    return data;
  },
};
