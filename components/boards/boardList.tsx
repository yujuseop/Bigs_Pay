"use client";

import { useBoard } from "@/src/hooks/useBoard";
import { useState } from "react";
import BoardDetailModal from "./boardDetailModal";
import LoadingSpinner from "@/components/ui/loadingSpiner";

interface Board {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

interface BoardListProps {
  selectedCategory?: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function BoardList({
  selectedCategory,
  currentPage,
  setCurrentPage,
}: BoardListProps) {
  const { data, isLoading, error } = useBoard(
    currentPage,
    10,
    selectedCategory
  );
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" variant="spinner" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 text-red-500">
        게시글을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (!data || !data.content) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        게시글 목록을 찾을 수 없습니다.
      </div>
    );
  }

  if (data.content.length === 0) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        게시글이 없습니다.
      </div>
    );
  }

  const totalPages = data.totalPages || 0;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div>
      <ul className="space-y-2">
        {data.content.map((board: Board) => (
          <li
            key={board.id}
            onClick={() => setSelectedBoardId(board.id)}
            className="p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-sm md:text-lg lg:text-xl">
                  {board.title}
                </h3>
                <p className="text-sm text-gray-600 md:text-base lg:text-lg">
                  {board.category}
                </p>
              </div>
              <span className="text-sm text-gray-500 md:text-base lg:text-lg">
                {board.createdAt}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            이전
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border border-gray-300 rounded ${
                currentPage === page
                  ? "bg-gray-500 text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
            }
            disabled={currentPage === totalPages - 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            다음
          </button>
        </div>
      )}

      {selectedBoardId && (
        <BoardDetailModal
          boardId={selectedBoardId}
          isOpen={!!selectedBoardId}
          onClose={() => setSelectedBoardId(null)}
        />
      )}
    </div>
  );
}
