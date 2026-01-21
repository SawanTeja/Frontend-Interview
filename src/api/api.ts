import axios from 'axios';
import { Blog, NewBlog } from '../types';

const API_URL = "http://localhost:3001"; 

const api = axios.create({
  baseURL: API_URL,
});

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await api.get<Blog[]>('/blogs');
  return response.data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const response = await api.get<Blog>(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blogData: NewBlog): Promise<Blog> => {
  const response = await api.post<Blog>('/blogs', {
    ...blogData,
    date: new Date().toISOString(),
  });
  return response.data;
};