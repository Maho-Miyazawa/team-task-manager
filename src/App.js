import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { changeUserId, fetchUserData } from "./slices/userSlice";
import { setNewTask, setNewPriorityId } from "./slices/taskSlice";
import axios from "axios";
import User from "./components/User";
import Tasks from "./components/Tasks";

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
