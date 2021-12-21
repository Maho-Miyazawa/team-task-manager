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
        progress
        priority
        is_deleted
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
            <div>
              {userData.tasks && userData.tasks.length > 0 && (
                <>
                  {userData.tasks.map((task) => {
                    return <div key={task.id}>{task.task}</div>;
                  })}
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
