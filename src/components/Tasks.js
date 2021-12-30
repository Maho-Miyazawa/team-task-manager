import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import TaskLine from "./TaskLine";
import { fetchUserData } from "../slices/userSlice";

function Tasks() {
  const dispatch = useDispatch();
  const userIdForTask = useSelector((state) => state.task.userIdForTask);
  const getUser = () => dispatch(fetchUserData(userIdForTask));

  useEffect(() => {
    getUser();
  });

  return (
    <>
      <div className="tasks-container">
        <TaskLine progressNum={1} taskLineContents="やること" />
        <TaskLine progressNum={2} taskLineContents="進行中" />
        <TaskLine progressNum={3} taskLineContents="完了" />
      </div>
    </>
  );
}

export default Tasks;
