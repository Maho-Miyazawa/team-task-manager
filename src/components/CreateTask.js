import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../slices/userSlice";
import { setNewTask, setNewPriorityId } from "../slices/taskSlice";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

function CreateTask() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const userData = useSelector((state) => state.user.userData);
  const newTask = useSelector((state) => state.task.newTask);
  const newPriorityId = useSelector((state) => state.task.newPriorityId);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setNewTask(""));
    dispatch(setNewPriorityId("1"));
  };

  const getUser = () => dispatch(fetchUserData(userId || userData.id));

  async function addNewTask(e) {
    try {
      e.preventDefault();
      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `mutation {
                createNewTask(
                  user_id: "${userData.id}"
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
      getUser();
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
    <>
      <Button onClick={handleOpen}>タスク作成</Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal">
          <Typography>タスク作成</Typography>
          <Typography>
            <>
              <input
                type="text"
                value={newTask}
                onChange={handleChangeNewTask}
              />
              <select value={newPriorityId} onChange={progressChange}>
                <option value={1}>低い</option>
                <option value={2}>普通</option>
                <option value={3}>高い</option>
              </select>
              <input type="submit" value="作成" onClick={addNewTask} />
              <button onClick={handleClose}>閉じる</button>
            </>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default CreateTask;
