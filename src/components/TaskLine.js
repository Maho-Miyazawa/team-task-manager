import "../App.css";
import { useSelector } from "react-redux";
import OneTask from "./OneTask";

function TaskLine(props) {
  const userData = useSelector((state) => state.userData);
  return (
    <>
      <div className="tasks">
        <div className="progress-title">{props.taskLineContents}</div>
        <>
          {userData.tasks
            .filter((task) => task.progress.id === props.progressNum)
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
        </>
      </div>
    </>
  );
}

export default TaskLine;
