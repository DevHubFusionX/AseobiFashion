import { axiosInstance } from '../lib/axios';

export const productApi = {
  getAll: async (params) => {
    const { data } = await axiosInstance.get('/products', { params });
    return data.data;
  },

  // Returns the full response with pagination metadata
  getAllPaginated: async (params) => {
    const { data } = await axiosInstance.get('/products', { params });
    return data;
  },


  getById: async (id) => {
    const { data } = await axiosInstance.get(`/products/${id}`);
    return data.data;
  },

  getByCategory: async (category) => {
    const { data } = await axiosInstance.get(`/products/category/${category}`);
    return data.data;
  },

  search: async (query) => {
    const { data } = await axiosInstance.get('/products/search', { params: { q: query } });
    return data.data;
  },

  getFilterOptions: async () => {
    const { data } = await axiosInstance.get('/products/filters');
    return data.data;
  },

  trackView: async (id) => {
    const { data } = await axiosInstance.post(`/products/${id}/view`);
    return data;
  },

  // Admin Operations
  create: async (payload) => {
    const { data } = await axiosInstance.post('/products', payload);
    return data;
  },

  update: async (id, payload) => {
    const { data } = await axiosInstance.put(`/products/${id}`, payload);
    return data;
  },

  delete: async (id) => {
    const { data } = await axiosInstance.delete(`/products/${id}`);
    return data;
  },
};
