"use client";

import { useParams } from "next/navigation";
import { useBoardDetail } from "@/src/hooks/useBoard";

export default function BoardDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useBoardDetail(Number(id));

  if (isLoading) return <div>로딩 중</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return <div>상세 게시글을 찾을 수 없습니다.</div>;

  return (
    <div>
      <p>{data?.data.id}</p>
      <p>{data?.data.title}</p>
      <p>{data?.data.content}</p>
      <p>{data?.data.boardCategory}</p>
      <p>{data?.data.createdAt}</p>
      <p>{data?.data.ImageUrl}</p>
    </div>
  );
}
