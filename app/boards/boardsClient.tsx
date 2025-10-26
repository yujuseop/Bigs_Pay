"use client";
import CreateBoardsModal from "@/components/boards/createBoardsModal";
import { useState } from "react";
import BoardCategories from "@/components/boards/boardCategories";
import BoardList from "@/components/boards/boardList";
import { FormButton } from "@/components/form/formButton";

export default function BoardsClient() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0); // 카테고리 변경 시 첫 페이지로 리셋
  };

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
