import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState({});
  const [newTask, setNewTask] = useState("");
  const [newProgressId, setNewProgressId] = useState("");
  const [newPriorityId, setNewPriorityId] = useState("");

  const userDatabaseData = `query {
    User(id: ${userId}) {
      id
      team_id
      name
      created_at
      updated_at
      tasks {
        id
        task
        is_deleted
        progress {
          id
          level
        }
        priority {
          id
          level
        }
      }
     }
    }`;

  async function getUser() {
    try {
      const response = await axios({
        method: "POST",
        url: "/graphql",
        data: { query: userDatabaseData },
      });
      setUserData(response.data.data.User);
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    setUserId(e.target.value);
  }

  function handleClick() {
    setUserData({});
    getUser();
  }

  function formChange(e, formType) {
    const obj = {
      task: (data) => setNewTask(data),
      progress: (data) => setNewProgressId(data),
      priority: (data) => setNewPriorityId(data),
    };

    for (const key in obj) {
      if (formType === key) {
        obj[key](e.target.value);
      }
    }
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
              progress_id: ${newProgressId}
              priority_id: ${newPriorityId}
            )
            {
              id
            }
          }`,
        },
      });
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
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>検索</button>
      <form>
        <input
          type="text"
          value={newTask}
          onChange={(e) => formChange(e, "task")}
        />
        <input
          type="text"
          value={newProgressId}
          onChange={(e) => formChange(e, "progress")}
        />
        <input
          type="text"
          value={newPriorityId}
          onChange={(e) => formChange(e, "priority")}
        />
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
