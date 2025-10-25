import { APIClient } from "./client";

export const createPost = async (data: {
  title: string;
  content: string;
  category: string;
}) => {
  const response = await APIClient.post("/boards", data);
  return response.data;
};

export const updatePost = async (id: number) => {
  const response = await APIClient.put(`/boards/${id}`);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await APIClient.delete(`/boards/${id}`);
  return response.data;
};

export const getPosts = async (id: number) => {
  const response = await APIClient.get(`/boards/${id}`);
  return response.data;
};

export const getBoard = async (page = 0, size = 10) => {
  const response = await APIClient.get(`/boards?page=${page}&size=${size}`);
  return response.data;
};

export const getBoardDetail = async (id: number) => {
  const response = await APIClient.get(`/boards/${id}`);
  return response.data;
};

export const getBoardCategory = async () => {
  const response = await APIClient.get("/boards/categories");
  return response.data;
};
