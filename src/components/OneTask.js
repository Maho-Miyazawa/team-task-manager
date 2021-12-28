import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../slices/userSlice";
import { editTask, editPriorityId } from "../slices/taskSlice";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

function OneTask(props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const userData = useSelector((state) => state.user.userData);
  const currentTask = useSelector((state) => state.task.currentTask);
  const currentPriorityId = useSelector(
    (state) => state.task.currentPriorityId
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getUser = () => dispatch(fetchUserData(userId || userData.id));

  async function progressChange(addNum, taskId, progressId) {
    try {
      let newProgressId = progressId + addNum;
      if (newProgressId >= 1 && newProgressId <= 3) {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `mutation {
                  updateProgress(taskId: ${taskId}, afterProgressNum: ${newProgressId}) {
                    id
                  }
                }`,
          },
        });

        getUser();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function taskDeleteButtonClick(e) {
    try {
      if (
        window.confirm(`タスク「${props.task}」を削除します。よろしいですか？`)
      ) {
        e.preventDefault();
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `mutation {
            deleteTask(
                taskId: ${props.taskId}
            )
            {
              id
            }
            }`,
          },
        });
        getUser();
      }
    } catch (err) {
      console.error(err);
    }
  }

  function Priority(num) {
    const obj = {
      1: "priority-tag-low",
      2: "priority-tag-middle",
      3: "priority-tag-high",
    };

    let className = "";
    for (const key in obj) {
      if (Number(num) === Number(key)) {
        className = obj[key];
        break;
      }
    }

    return <div className={className}>優先度: {props.priorityLevel}</div>;
  }

  function editButtonClick(e) {
    e.preventDefault();
    dispatch(editTask(props.task));
    dispatch(editPriorityId(props.priorityId));
    handleOpen();
  }

  async function updateTaskButtonClick(e) {
    try {
      e.preventDefault();
      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `mutation {
            updateTask(
                taskId: ${props.taskId}
                task: "${currentTask}"
                priority_id: ${currentPriorityId}
            )
            {
              id
            }
           }`,
        },
      });
      dispatch(editTask(""));
      dispatch(editPriorityId(""));
      getUser();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  }

  function updateCancel(e) {
    e.preventDefault();
    dispatch(editTask(""));
    dispatch(editPriorityId(""));
    handleClose();
  }

  function handleEditTask(e) {
    e.preventDefault();
    dispatch(editTask(e.target.value));
  }

  function handleEditPriority(e) {
    e.preventDefault();
    dispatch(editPriorityId(Number(e.target.value)));
  }

  return (
    <>
      <div className="task" key={props.taskId}>
        <div>{props.task}</div>
        <>{Priority(props.priorityId)}</>
        <button
          onClick={() => progressChange(-1, props.taskId, props.progressId)}
        >
          左に移動
        </button>
        <button
          onClick={() => progressChange(1, props.taskId, props.progressId)}
        >
          右に移動
        </button>
        <button onClick={editButtonClick}>編集</button>
        <button onClick={taskDeleteButtonClick}>削除</button>
      </div>
      <>
        <Modal open={open} onClose={handleClose}>
          <Box className="modal">
            <Typography>タスク編集</Typography>
            <>
              <input
                type="text"
                value={currentTask}
                onChange={handleEditTask}
              />
              <select value={currentPriorityId} onChange={handleEditPriority}>
                <option value={1}>低い</option>
                <option value={2}>普通</option>
                <option value={3}>高い</option>
              </select>
              <button onClick={updateCancel}>キャンセル</button>
              <input
                type="submit"
                value="更新"
                onClick={updateTaskButtonClick}
              />
              <button onClick={handleClose}>閉じる</button>
            </>
          </Box>
        </Modal>
      </>
    </>
  );
}

export default OneTask;
