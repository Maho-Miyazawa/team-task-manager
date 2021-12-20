import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { useState, useRef } from "react";

function App() {
  const [searchNameInput, setSearchNameInput] = useState("");
  const [searchNameConfirm, setSearchNameConfirm] = useState("");
  const [userId, setUserId] = useState();
  const inputEl = useRef(null);

  const GET_NAME = gql`
    query  {
      Users(name: "${searchNameConfirm}") {
        id
        team_id
        name
      }
      Notes(user_id: ${userId}) {
        id
        user_id
        note
        progress
        priority
        is_deleted
      }
    }
`;

  const { loading, error, data } = useQuery(GET_NAME);

  function searchStart() {
    setSearchNameConfirm(searchNameInput);
    inputEl.current.focus();
  }

  function nameInputChange(e) {
    setSearchNameInput(e.target.value);
  }

  function searchButtonClick(e) {
    e.preventDefault();
    searchStart();
  }
  function enterClick(e) {
    if (e.key === "Enter") {
      searchStart();
    }
  }

  function userChooseButtonClick(e) {
    setUserId(e.target.value);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      {!userId && (
        <div>
          <input
            type="text"
            onChange={nameInputChange}
            onKeyDown={enterClick}
            value={searchNameInput}
            ref={inputEl}
          />
          <button type="button" onClick={searchButtonClick}>
            検索
          </button>
          <div>
            {data.Users.length === 0 ? (
              <p>検索結果はありませんでした</p>
            ) : (
              <table>
                <tbody>
                  {data.Users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>
                          <button
                            value={user.id}
                            onClick={userChooseButtonClick}
                          >
                            Click!!
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
      {userId && (
        <table>
          <tbody>
            {data.Notes.map((note) => {
              return (
                <tr key={note.id}>
                  <td>{note.id}</td>
                  <td>{note.user_id}</td>
                  <td>{note.note}</td>
                  <td>{note.progress}</td>
                  <td>{note.priority}</td>
                  <td>{note.is_deleted}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
