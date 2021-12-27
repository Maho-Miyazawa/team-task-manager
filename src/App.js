import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { changeUserId, fetchUserData } from "./slices/userSlice";
import { setNewTask, setNewPriorityId } from "./slices/taskSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId.userId);
  const userData = useSelector((state) => state.userData);
  const newTask = useSelector((state) => state.newTask.newTask);
  const newPriorityId = useSelector(
    (state) => state.newPriorityId.newPriorityId
  );

  // TODO 検索入力欄がnullの時のエラー解消
  function getUser() {
    dispatch(fetchUserData(userId || userData.id));
  }

  function handleChangeUserId(e) {
    dispatch(changeUserId(e.target.value));
  }

  function handleSearchButtonClick(e) {
    e.preventDefault();
    getUser();
  }

  function handleChangeNewTask(e) {
    dispatch(setNewTask(e.target.value));
  }

  function progressChange(e) {
    dispatch(setNewPriorityId(e.target.value));
  }

  async function addNewTask(e) {
    try {
      e.preventDefault();
      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `mutation {
            createNewTask(
              user_id: ${userData.id}
              task: "${newTask}"
              priority_id: ${newPriorityId}
            )
            {
              id
            }
          }`,
        },
      });
      dispatch(setNewTask(""));
      dispatch(setNewPriorityId(""));
      getUser();
    } catch (err) {
      console.error(err);
    }
  }

  async function taskRightMove(addNum, taskId, progressId) {
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

        getUser();
      }
    } catch (err) {
      console.error(err);
    }
  }

  function Task(num) {
    return userData.tasks
      .filter((task) => task.progress.id === num)
      .map((task) => {
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

          return <div className={className}>優先度: {task.priority.level}</div>;
        }

        return (
          <div className="task" key={task.id}>
            <div>{task.task}</div>
            <>{Priority(task.priority.id)}</>
            <button
              onClick={() => taskRightMove(-1, task.id, task.progress.id)}
            >
              左に移動
            </button>
            <button onClick={() => taskRightMove(1, task.id, task.progress.id)}>
              右に移動
            </button>
          </div>
        );
      });
  }

  return (
    <div className="wrapper">
      <input type="text" onChange={handleChangeUserId} />
      <button onClick={handleSearchButtonClick}>検索</button>
      <form>
        <input type="text" value={newTask} onChange={handleChangeNewTask} />
        <select value={newPriorityId} onChange={progressChange}>
          <option value={1}>低い</option>
          <option value={2}>普通</option>
          <option value={3}>高い</option>
        </select>
        <input type="submit" value="作成" onClick={addNewTask} />
      </form>
      <>
        {userData ? (
          <div className="main">
            <div>
              <div>ID: {userData.id}</div>
              <div>Name: {userData.name}</div>
            </div>
            <div className="tasks-container">
              {userData.tasks && userData.tasks.length > 0 && (
                <>
                  <div className="tasks">
                    <div className="progress-title">やること</div>
                    {Task(1)}
                  </div>
                  <div className="tasks">
                    <div className="progress-title">進行中</div>
                    {Task(2)}
                  </div>
                  <div className="tasks">
                    <div className="progress-title">完了</div>
                    {Task(3)}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div>存在しません</div>
        )}
      </>
    </div>
  );
}

export default App;
