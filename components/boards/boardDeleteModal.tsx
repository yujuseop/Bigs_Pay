import Modal from "../ui/modal";
import { useDeletePost } from "@/src/hooks/useBoard";
import LoadingSpinner from "../ui/loadingSpiner";
import { toast } from "js-toastify";

interface BoardDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  boardId: number;
  onDeleteSuccess?: () => void;
}

export default function BoardDeleteModal({
  isOpen,
  onClose,
  boardId,
  onDeleteSuccess,
}: BoardDeleteModalProps) {
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="게시글 삭제" size="md">
      <p className="text-sm md:text-base lg:text-lg text-center mb-4">
        정말 삭제하시겠습니까?
      </p>
      <button
        onClick={() =>
          deletePost(boardId, {
            onSuccess: () => {
              toast("게시글이 삭제되었습니다.", {
                type: "success",
              });
              onClose();
              onDeleteSuccess?.();
            },
          })
        }
        disabled={isDeleting}
        className="px-4 py-1 w-full bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 text-sm md:text-base lg:text-lg"
      >
        {isDeleting ? (
          <LoadingSpinner size="sm" variant="spinner" color="white" />
        ) : (
          "삭제"
        )}
      </button>
    </Modal>
  );
}
