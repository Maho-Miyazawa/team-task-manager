import { Link } from "react-router-dom";
import Header from "./Header";
import Tasks from "./Tasks";
import { useSelector } from "react-redux";

function MemberTasks() {
  const userNameForTasks = useSelector((state) => state.task.userNameForTasks);

  return (
    <div>
      <Header />
      <div className="member-tasks-page-container">
        <div className="member-tasks-page-container-button-area">
          <Link to="/my-page">
            <button className="go-my-page-button">マイページへ</button>
          </Link>
          <Link to="/member">
            <button className="member-list-button">メンバー一覧</button>
          </Link>
          <div>{userNameForTasks}</div>
        </div>
        <Tasks />
      </div>
    </div>
  );
}

export default MemberTasks;
