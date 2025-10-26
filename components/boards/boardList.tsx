"use client";

import { useBoard } from "@/src/hooks/useBoard";
import { useState } from "react";
import BoardDetailModal from "./boardDetailModal";

interface Board {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

interface BoardListProps {
  selectedCategory?: string;
}

export default function BoardList({ selectedCategory }: BoardListProps) {
  const { data, isLoading, error } = useBoard(0, 10, selectedCategory);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

  if (isLoading) return <div>로딩 중</div>;
  if (error) return <div>에러 발생</div>;
  if (!data || !data.content) return <div>게시글 목록을 찾을 수 없습니다.</div>;
  if (data.content.length === 0) return <div>게시글이 없습니다.</div>;

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
                <h3 className="font-semibold text-lg">{board.title}</h3>
                <p className="text-sm text-gray-600">{board.category}</p>
              </div>
              <span className="text-sm text-gray-500">{board.createdAt}</span>
            </div>
          </li>
        ))}
      </ul>

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
