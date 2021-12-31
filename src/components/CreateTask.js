import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../slices/userSlice";
import { setNewTask, setNewPriorityId } from "../slices/taskSlice";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

function CreateTask() {
  const dispatch = useDispatch();
  const newTask = useSelector((state) => state.task.newTask);
  const newPriorityId = useSelector((state) => state.task.newPriorityId);
  const profileUserId = useSelector((state) => state.user.profileUserId);
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => {
    setOpen(false);
    dispatch(setNewTask(""));
    dispatch(setNewPriorityId("1"));
  };

  const getUser = () => dispatch(fetchUserData(profileUserId));

  async function addNewTask(e) {
    try {
      e.preventDefault();
      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `mutation {
                createNewTask(
                  user_id: "${profileUserId}"
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
      <button onClick={modalOpen} className="create-task-button">
        タスク作成
      </button>
      <Modal open={open} onClose={modalClose}>
        <Box className="modal">
          <Typography className="modal-contents">
            <Typography className="modal-title-area">
              <label className="modal-title">新規作成</label>
            </Typography>
            <Typography>
              <label className="modal-label">タスク: </label>
              <input
                type="text"
                value={newTask}
                className="modal-input-task"
                onChange={handleChangeNewTask}
              />
            </Typography>
            <Typography>
              <label className="modal-label">優先度: </label>
              <select
                className="modal-input-priority"
                value={newPriorityId}
                onChange={progressChange}
              >
                <option value={1}>低い</option>
                <option value={2}>普通</option>
                <option value={3}>高い</option>
              </select>
            </Typography>
            <Typography className="modal-finish-button-area">
              <input
                className="modal-confirm-finish-button"
                type="submit"
                value="作成"
                onClick={addNewTask}
              />
              <button className="modal-close-button" onClick={modalClose}>
                閉じる
              </button>
            </Typography>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default CreateTask;
