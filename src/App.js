import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState({});

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
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setUserId(e.target.value);
  }

  function handleClick() {
    setUserData({});
    getUser();
  }

  function check() {
    console.log(userData);
  }

  function Task(num) {
    return userData.tasks
      .filter((task) => {
        if (task.progress.id === num) {
          return true;
        } else {
          return false;
        }
      })
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
          </div>
        );
      });
  }

  return (
    <div className="wrapper">
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>検索</button>
      <button onClick={check}>データテスト用</button>
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
