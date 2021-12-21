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
      notes {
        id
        note
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
            <div>Note:</div>
            <>
              {userData.notes && userData.notes.length > 0 && (
                <>
                  {userData.notes.map((note) => {
                    return <div key={note.id}>{note.note}</div>;
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
