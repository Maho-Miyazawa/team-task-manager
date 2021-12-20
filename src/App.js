import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    Users {
      id
      team_id
      name
    }
  }
`;

function App() {
  const [searchNameInput, setSearchNameInput] = useState("");
  const [searchNameConfirm, setSearchNameConfirm] = useState("");

  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  function searchNameChange(e) {
    setSearchNameInput(e.target.value);
  }
  function searchNameClick() {
    setSearchNameConfirm(searchNameInput);
    setSearchNameInput("");
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div>
        {data.Users.map((user) => {
          return (
            <div key={user.id}>
              ID: {user.id}, Team ID:{user.team_id}, Name: {user.name}
            </div>
          );
        })}
      </div>
      <input type="text" onChange={searchNameChange} value={searchNameInput} />
      <button type="button" onClick={searchNameClick}>
        検索
      </button>
      <div>{searchNameConfirm}</div>
    </div>
  );
}

export default App;
