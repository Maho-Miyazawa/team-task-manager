import "../App.css";
import { useSelector } from "react-redux";
import OneTask from "./OneTask";

function TaskLine(props) {
  const userData = useSelector((state) => state.user.userData);
  return (
    <>
      <div className="task-line">
        <div className="progress-title">{props.taskLineContents}</div>
        <div className="task-one-line-area">
          {userData.tasks &&
            userData.tasks
              .filter((task) => task.progress.id === props.progressNum)
              .filter((task) => !task.is_deleted)
              .map((task) => {
                return (
                  <OneTask
                    taskId={task.id}
                    task={task.task}
                    priorityId={task.priority.id}
                    priorityLevel={task.priority.level}
                    progressId={task.progress.id}
                    key={task.id}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}

export default TaskLine;
