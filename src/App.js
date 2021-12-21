import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { useState, useRef } from "react";

function App() {
  const GET_DATA = gql`
    query {
      User(id: 1) {
        id
        team_id
        name
        notes {
          id
          note
          progress
          priority
          is_deleted
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  function handleClick() {
    console.log(data.User);
  }

  return (
    <>
      <div>Good</div>
      <button onClick={handleClick}>Click Me!!!</button>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <>{data.User ? <td>{data.User.id}</td> : <td></td>}</>
          </tr>
          <tr>
            <th>Name</th>
            <>{data.User ? <td>{data.User.name}</td> : <td></td>}</>
          </tr>
          <tr>
            <th>Notes</th>
            <>
              {data.User && data.User.notes.length > 0 ? (
                data.User.notes.map((note) => {
                  return <td key={note.id}>{note.note}</td>;
                })
              ) : (
                <td></td>
              )}
            </>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App;
