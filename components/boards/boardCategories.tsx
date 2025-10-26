"use client";

import { useBoardCategory } from "@/src/hooks/useBoard";
import { useState } from "react";

interface BoardCategoriesProps {
  onCategoryChange?: (category: string) => void;
}

export default function BoardCategories({
  onCategoryChange,
}: BoardCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: categories, isLoading } = useBoardCategory();

  if (isLoading) return <p>Loading categories</p>;
  if (!categories) return <p>카테고리를 찾을 수 없습니다.</p>;

  const categoryArray = Object.entries(categories).map(([key, value]) => ({
    id: key,
    name: String(value),
  }));

  return (
    <select
      value={selectedCategory}
      onChange={(e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        if (onCategoryChange) {
          onCategoryChange(category);
        }
      }}
    >
      <option value="" className="text-sm md:text-base lg:text-lg">
        카테고리 선택
      </option>
      {categoryArray.map((cat) => (
        <option
          key={cat.id}
          value={cat.id}
          className="text-sm md:text-base lg:text-lg"
        >
          {cat.name}
        </option>
      ))}
    </select>
  );
}
