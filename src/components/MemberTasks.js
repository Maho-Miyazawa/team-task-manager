import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Tasks from "./Tasks";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setIsMyTask,
  setUserIdForTasks,
  setUserNameForTasks,
} from "../slices/taskSlice";
import { setMemberTeamId } from "../slices/memberSlice";

function MemberTasks() {
  const { id, name, teamId } = useParams();
  const dispatch = useDispatch();
  const userNameForTasks = useSelector((state) => state.task.userNameForTasks);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsMyTask(false));
    dispatch(setUserIdForTasks(id));
    dispatch(setUserNameForTasks(name));
    dispatch(setMemberTeamId(teamId));
  });

  const memberListClick = (e) => {
    e.preventDefault();
    dispatch(setMemberTeamId(teamId));
    navigate("/member");
  };

  return (
    <div>
      <Header />
      <div className="member-tasks-page-container">
        <div className="member-tasks-page-container-button-area">
          <Link to="/my-page">
            <button className="go-my-page-button">マイページへ</button>
          </Link>
          <button className="member-list-button" onClick={memberListClick}>
            メンバー一覧
          </button>
          <div>{userNameForTasks}</div>
        </div>
        <Tasks />
      </div>
    </div>
  );
}

export default MemberTasks;
