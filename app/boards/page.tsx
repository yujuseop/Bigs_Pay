import BoardList from "@/components/boards/boardList";
import BoardDetail from "@/components/boards/boardDetail";
import BoardCategories from "@/components/boards/boardCategories";

export default function BoardsPage() {
  return (
    <div>
      <BoardList />
      <BoardDetail />
      <BoardCategories />
    </div>
  );
}
