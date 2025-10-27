"use client";
import CreateBoardsModal from "@/components/boards/createBoardsModal";
import { useState } from "react";
import BoardCategories from "@/components/boards/boardCategories";
import BoardList from "@/components/boards/boardList";
import { FormButton } from "@/components/form/formButton";
import LoadingSpinner from "@/components/ui/loadingSpiner";
import { useBoardCategory } from "@/src/hooks/useBoard";

export default function BoardsClient() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);

  const { isLoading: isCategoriesLoading } = useBoardCategory();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  if (isCategoriesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" variant="spinner" color="primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 text-sm md:text-base lg:text-lg p-4">
      <div className="flex justify-between items-center">
        <BoardCategories onCategoryChange={handleCategoryChange} />
        <FormButton
          onClick={() => setIsCreateModalOpen(true)}
          variant="secondary"
          size="medium"
        >
          글 작성
        </FormButton>
      </div>
      <CreateBoardsModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <BoardList
        selectedCategory={selectedCategory || undefined}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
