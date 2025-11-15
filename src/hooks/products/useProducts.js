import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/services/productsService';

// Query keys (centralized)
export const productsKeys = {
  all: ['products'],
  lists: () => [...productsKeys.all, 'list'],
  list: (filters) => [...productsKeys.lists(), filters],
  details: () => [...productsKeys.all, 'detail'],
  detail: (id) => [...productsKeys.details(), id],
};

// Get all users
export function useProducts(filters = {}) {
  return useQuery({
    queryKey: productsKeys.list(filters),
    queryFn: () => productsService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
