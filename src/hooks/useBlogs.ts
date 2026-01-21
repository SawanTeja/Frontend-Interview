import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBlogs, getBlogById, createBlog } from '../api/api';
import { NewBlog } from '../types';

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });
};

export const useBlog = (id: string | null) => {
  return useQuery({
    queryKey: ['blogs', id],
    queryFn: () => getBlogById(id!),
    enabled: !!id,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBlog: NewBlog) => createBlog(newBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};