import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Tasks from "./Tasks";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setIsMyTask,
  setUserIdForTasks,
  setUserNameForTasks,
} from "../slices/taskSlice";

function MemberTasks() {
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const userNameForTasks = useSelector((state) => state.task.userNameForTasks);

  useEffect(() => {
    dispatch(setIsMyTask(false));
    dispatch(setUserIdForTasks(id));
    dispatch(setUserNameForTasks(name));
  });

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
