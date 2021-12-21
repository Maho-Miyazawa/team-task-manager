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
    <>
      <div>userId: {userId}</div>
      <div>Good</div>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>Click Me!!!</button>
      <button onClick={check}>Check!!</button>
      <>
        {userData ? (
          <>
            <div>ID: {userData.id}</div>
            <div>Name: {userData.name}</div>
            <div>Task:</div>
            <>
              {userData.tasks && userData.tasks.length > 0 && (
                <>
                  {userData.tasks.map((task) => {
                    return <div key={task.id}>{task.task}</div>;
                  })}
                </>
              )}
            </>
          </>
        ) : (
          <div>存在しません</div>
        )}
      </>
    </>
  );
}

export default App;
