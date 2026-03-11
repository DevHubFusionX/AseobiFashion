import { axiosInstance } from '../lib/axios';

export const cartApi = {
  getCart: async () => {
    const { data } = await axiosInstance.get('/cart');
    return data;
  },

  addItem: async (item) => {
    const { data } = await axiosInstance.post('/cart/items', item);
    return data;
  },

  updateItem: async (itemId, updates) => {
    const { data } = await axiosInstance.patch(`/cart/items/${itemId}`, updates);
    return data;
  },

  removeItem: async (itemId) => {
    const { data } = await axiosInstance.delete(`/cart/items/${itemId}`);
    return data;
  },

  clearCart: async () => {
    const { data } = await axiosInstance.delete('/cart');
    return data;
  },
};
