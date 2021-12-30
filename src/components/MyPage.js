import { Link } from "react-router-dom";
import Header from "./Header";
import Tasks from "./Tasks";
import CreateTask from "./CreateTask";

function MyPage() {
  return (
    <div>
      <Header />
      <CreateTask />
      <Link to="/member">
        <button>メンバー一覧</button>
      </Link>
      <Tasks />
    </div>
  );
}

export default MyPage;
