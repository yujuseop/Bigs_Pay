import { APIClient } from "./client";

export const createPost = async (data: {
  title: string;
  content: string;
  category: string;
}) => {
  const formData = new FormData();

  const requestData = JSON.stringify({
    title: data.title,
    content: data.content,
    category: data.category,
  });

  const requestBlob = new Blob([requestData], { type: "application/json" });
  formData.append("request", requestBlob);

  const response = await APIClient.post("/boards", formData);
  return response.data;
};

export const updatePost = async (
  id: number,
  data: { title: string; content: string; category: string }
) => {
  const formData = new FormData();

  const requestData = JSON.stringify({
    title: data.title,
    content: data.content,
    category: data.category,
  });

  const requestBlob = new Blob([requestData], { type: "application/json" });
  formData.append("request", requestBlob);

  const response = await APIClient.patch(`/boards/${id}`, formData);
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

export const getBoard = async (page = 0, size = 10, category?: string) => {
  const response = await APIClient.get(`/boards?page=${page}&size=${size}`);

  if (category && response.data.content) {
    response.data.content = response.data.content.filter(
      (item: { category?: string; boardCategory?: string }) =>
        (item.category || item.boardCategory) === category
    );
    response.data.totalElements = response.data.content.length;
  }

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
