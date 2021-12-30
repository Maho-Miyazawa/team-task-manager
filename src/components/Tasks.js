import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import CreateTask from "./CreateTask";
import TaskLine from "./TaskLine";
import { fetchUserData } from "../slices/userSlice";

function Tasks() {
  const dispatch = useDispatch();
  const profileUserId = useSelector((state) => state.signup.profileUserId);
  const getUser = () => dispatch(fetchUserData(profileUserId));

  useEffect(() => {
    getUser();
  });

  return (
    <>
      <CreateTask />
      <div className="tasks-container">
        <TaskLine progressNum={1} taskLineContents="やること" />
        <TaskLine progressNum={2} taskLineContents="進行中" />
        <TaskLine progressNum={3} taskLineContents="完了" />
      </div>
    </>
  );
}

export default Tasks;
