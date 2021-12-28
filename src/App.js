import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { changeUserId, fetchUserData } from "./slices/userSlice";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import User from "./components/User";
import CreateTask from "./components/CreateTask";
import Tasks from "./components/Tasks";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId.userId);
  const userData = useSelector((state) => state.userData);

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

  return (
    <div className="wrapper">
      <LoginButton />
      <LogoutButton />
      <Profile />
      <input type="text" onChange={handleChangeUserId} />
      <button onClick={handleSearchButtonClick}>検索</button>
      <CreateTask />
      <>
        {userData ? (
          <div className="main">
            <User />
            <div className="tasks-container">
              <Tasks />
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
