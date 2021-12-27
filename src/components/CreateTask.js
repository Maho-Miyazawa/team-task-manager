import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../slices/userSlice";
import { setNewTask, setNewPriorityId } from "../slices/taskSlice";
import axios from "axios";

function CreateTask() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId.userId);
  const userData = useSelector((state) => state.userData);
  const newTask = useSelector((state) => state.newTask.newTask);
  const newPriorityId = useSelector(
    (state) => state.newPriorityId.newPriorityId
  );

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
      dispatch(setNewPriorityId("1"));
      dispatch(fetchUserData(userId || userData.id));
    } catch (err) {
      console.error(err);
    }
  }

  function handleChangeNewTask(e) {
    dispatch(setNewTask(e.target.value));
  }

  function progressChange(e) {
    dispatch(setNewPriorityId(e.target.value));
  }

  return (
    <form>
      <input type="text" value={newTask} onChange={handleChangeNewTask} />
      <select value={newPriorityId} onChange={progressChange}>
        <option value={1}>低い</option>
        <option value={2}>普通</option>
        <option value={3}>高い</option>
      </select>
      <input type="submit" value="作成" onClick={addNewTask} />
    </form>
  );
}

export default CreateTask;
