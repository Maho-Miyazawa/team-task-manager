import { Link } from "react-router-dom";
import Header from "./Header";
import Tasks from "./Tasks";
import CreateTask from "./CreateTask";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsMyTask,
  setUserIdForTasks,
  setUserNameForTasks,
} from "../slices/taskSlice";

function MyPage() {
  const dispatch = useDispatch();
  const profileUserId = useSelector((state) => state.user.profileUserId);
  const profileUserName = useSelector((state) => state.user.profileUserName);
  const userNameForTasks = useSelector((state) => state.task.userNameForTasks);

  useEffect(() => {
    dispatch(setIsMyTask(true));
    dispatch(setUserIdForTasks(profileUserId));
    dispatch(setUserNameForTasks(profileUserName));
  });

  return (
    <div>
      <Header />
      <div className="my-page-container">
        <div className="my-page-container-button-area">
          <CreateTask />
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

export default MyPage;
