"use client";

import { useQuery } from "@tanstack/react-query";
import { getBoard, getBoardDetail, getBoardCategory } from "../api/posts";

export const useBoard = (page: number, size: number) => {
  return useQuery({
    queryKey: ["board", page, size],
    queryFn: () => getBoard(page, size),
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
