import { QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error) => {
        toast.error(error.message || 'Failed to fetch data');
      },
    },
    mutations: {
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Operation failed');
      },
    },
  },
});
