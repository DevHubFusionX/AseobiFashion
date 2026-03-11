import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../services/productApi';

export const useProducts = (params) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productApi.getAll(params),
  });
};

export const useInfiniteProducts = (params) => {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await productApi.getAllPaginated({ ...params, page: pageParam });
      return {
        data: response.data,
        page: response.page,
        hasNextPage: response.hasNextPage,
        total: response.total
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });
};

// Fetch dynamic filter options (categories, colors) from the database
export const useFilterOptions = () => {
  return useQuery({
    queryKey: ['filterOptions'],
    queryFn: () => productApi.getFilterOptions(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (category) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productApi.getByCategory(category),
    enabled: !!category,
  });
};

export const useProductSearch = (query) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => productApi.search(query),
    enabled: query.length > 2,
  });
};

// Admin Mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => productApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => productApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => productApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
