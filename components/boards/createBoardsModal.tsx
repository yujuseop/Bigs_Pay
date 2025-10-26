"use client";

import Modal from "../ui/modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePost } from "@/src/hooks/useBoard";
import LoadingSpinner from "../ui/loadingSpiner";
import { toast } from "js-toastify";

const createPostSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
});

interface CreateBoardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBoardsModal({
  isOpen,
  onClose,
}: CreateBoardsModalProps) {
  const { mutate: createPost, isPending } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = (data: z.infer<typeof createPostSchema>) => {
    createPost(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
      onError: () => {
        toast("글 작성 중 오류가 발생했습니다. 다시 시도해주세요.", {
          type: "error",
        });
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="글 작성" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 md:text-base lg:text-lg">
            카테고리
          </label>
          <select
            {...register("category")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          >
            <option value="">선택하세요</option>
            <option value="NOTICE">공지</option>
            <option value="FREE">자유</option>
            <option value="QNA">Q&A</option>
            <option value="ETC">기타</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1 md:text-base lg:text-lg">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 md:text-base lg:text-lg">
            제목
          </label>
          <input
            type="text"
            {...register("title")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base lg:text-lg"
            placeholder="제목을 입력하세요"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 md:text-base lg:text-lg">
            내용
          </label>
          <textarea
            {...register("content")}
            rows={10}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="내용을 입력하세요"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1 md:text-base lg:text-lg">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm md:text-base lg:text-lg"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm md:text-base lg:text-lg"
          >
            {isPending ? (
              <LoadingSpinner size="sm" variant="spinner" color="white" />
            ) : (
              "저장"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
