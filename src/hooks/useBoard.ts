"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBoard,
  getBoardDetail,
  getBoardCategory,
  createPost,
  updatePost,
  deletePost,
} from "../api/posts";

export const useBoard = (page: number, size: number, category?: string) => {
  return useQuery({
    queryKey: ["board", page, size, category],
    queryFn: () => getBoard(page, size, category),
  });
};

export const useBoardDetail = (id: number) => {
  return useQuery({
    queryKey: ["board", id],
    queryFn: () => getBoardDetail(id),
    enabled: !!id,
  });
};

export const useBoardCategory = () => {
  return useQuery({
    queryKey: ["board-category"],
    queryFn: getBoardCategory,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { title: string; content: string; category: string };
    }) => updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board"] });
    },
  });
};
