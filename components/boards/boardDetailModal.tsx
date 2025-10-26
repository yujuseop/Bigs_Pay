"use client";

import Modal from "../ui/modal";
import {
  useBoardDetail,
  useUpdatePost,
  useDeletePost,
} from "@/src/hooks/useBoard";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const updatePostSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
});

interface BoardDetailModalProps {
  boardId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function BoardDetailModal({
  boardId,
  isOpen,
  onClose,
}: BoardDetailModalProps) {
  const { data, isLoading, error } = useBoardDetail(boardId);
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof updatePostSchema>>({
    resolver: zodResolver(updatePostSchema),
    values: data
      ? {
          title: data.title,
          content: data.content,
          category: data.boardCategory,
        }
      : undefined,
  });

  const handleUpdate = (formData: z.infer<typeof updatePostSchema>) => {
    updatePost(
      { id: boardId, data: formData },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deletePost(boardId, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  if (isLoading)
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        로딩 중
      </Modal>
    );
  if (error)
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        에러 발생
      </Modal>
    );
  if (!data) return null;

  const board = data;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="글 상세" size="lg">
      {isEditing ? (
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              카테고리
            </label>
            <select
              {...register("category")}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">선택하세요</option>
              <option value="NOTICE">공지</option>
              <option value="FREE">자유</option>
              <option value="QNA">Q&A</option>
              <option value="ETC">기타</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              {...register("title")}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              {...register("content")}
              rows={10}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isUpdating ? "수정 중..." : "수정"}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold">{board.title}</h3>
            <div className="flex gap-4 text-sm text-gray-600 mt-2">
              <span>카테고리: {board.boardCategory}</span>
              <span>작성일: {board.createdAt}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="whitespace-pre-wrap">{board.content}</p>
          </div>

          {board.ImageUrl && (
            <div>
              <img
                src={board.ImageUrl}
                alt="게시글 이미지"
                className="max-w-full"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
