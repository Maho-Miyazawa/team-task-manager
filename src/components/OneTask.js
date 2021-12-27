import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../slices/userSlice";
import axios from "axios";

function OneTask(props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId.userId);
  const userData = useSelector((state) => state.userData);

  async function progressChange(addNum, taskId, progressId) {
    try {
      let newProgressId = progressId + addNum;
      if (newProgressId >= 1 && newProgressId <= 3) {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `mutation {
                  updateProgress(taskId: ${taskId}, afterProgressNum: ${newProgressId}) {
                    id
                  }
                }`,
          },
        });

        dispatch(fetchUserData(userId || userData.id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function taskDeleteButtonClick(e) {
    try {
      if (
        window.confirm(`タスク「${props.task}」を削除します。よろしいですか？`)
      ) {
        e.preventDefault();
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `mutation {
            deleteTask(
                taskId: ${props.taskId}
            )
            {
              id
            }
            }`,
          },
        });
        dispatch(fetchUserData(userId || userData.id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  function Priority(num) {
    const obj = {
      1: "priority-tag-low",
      2: "priority-tag-middle",
      3: "priority-tag-high",
    };

    let className = "";
    for (const key in obj) {
      if (Number(num) === Number(key)) {
        className = obj[key];
        break;
      }
    }

    return <div className={className}>優先度: {props.priorityLevel}</div>;
  }

  return (
    <div className="task" key={props.taskId}>
      <div>{props.task}</div>
      <>{Priority(props.priorityId)}</>
      <button
        onClick={() => progressChange(-1, props.taskId, props.progressId)}
      >
        左に移動
      </button>
      <button onClick={() => progressChange(1, props.taskId, props.progressId)}>
        右に移動
      </button>
      <button onClick={taskDeleteButtonClick}>削除</button>
    </div>
  );
}

export default OneTask;
