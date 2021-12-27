import "../App.css";
import { useSelector } from "react-redux";
import TaskLine from "./TaskLine";

function Tasks() {
  const userData = useSelector((state) => state.userData);
  return (
    <>
      {userData.tasks && userData.tasks.length > 0 && (
        <>
          <TaskLine progressNum={1} taskLineContents="やること" />
          <TaskLine progressNum={2} taskLineContents="進行中" />
          <TaskLine progressNum={3} taskLineContents="完了" />
        </>
      )}
    </>
  );
}

export default Tasks;
