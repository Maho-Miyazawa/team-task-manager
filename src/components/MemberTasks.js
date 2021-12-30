import { Link } from "react-router-dom";
import Header from "./Header";
import Tasks from "./Tasks";
import { useSelector } from "react-redux";

function MemberTasks() {
  const userNameForTasks = useSelector((state) => state.task.userNameForTasks);

  return (
    <div>
      <Header />
      <div>{userNameForTasks}</div>
      <Link to="/my-page">
        <button>マイページへ</button>
      </Link>
      <Link to="/member">
        <button>メンバー一覧</button>
      </Link>
      <Tasks />
    </div>
  );
}

export default MemberTasks;
