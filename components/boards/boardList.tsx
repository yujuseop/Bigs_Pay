"use client";

import { useBoard } from "@/src/hooks/useBoard";

interface Board {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

export default function BoardList() {
  const { data, isLoading, error } = useBoard(0, 10);

  if (isLoading) return <div>로딩 중</div>;
  if (error) return <div>에러 발생</div>;
  if (!data || !data.content) return <div>게시글 목록을 찾을 수 없습니다.</div>;
  if (data.content.length === 0) return <div>게시글이 없습니다.</div>;

  return (
    <ul className="space-y-2">
      {data.content.map((board: Board) => (
        <li key={board.id}>{board.title}</li>
      ))}
    </ul>
  );
}
